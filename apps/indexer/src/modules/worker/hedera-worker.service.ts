import {
  BorrowerTransactionStatus,
  BorrowerTransactionType,
  EventType,
  LenderTransactionStatus,
  LenderTransactionType,
  OnchainStatus,
} from "../../shared/enums";
import {
  Bond,
  BondCheckout,
  BorrowerTransaction,
  LatestBlock,
  LenderTransaction,
} from "../../database/entities";
import { DataSource, EntityManager } from "typeorm";
import { Logger } from "@nestjs/common";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import abi from "../contract/BondIssuance.json";
import { caculatePercentage } from "utils";

export class HederaWorkerService {
  private logger = new Logger(HederaWorkerService.name);
  public isStopped = false;
  public isDelisted = false;
  public contractId = process.env.CONTRACT_ID;
  public contractAddress = process.env.CONTRACT_ADDRESS;
  public chainId = process.env.CHAIN_ID;

  constructor(private readonly dataSource: DataSource) {
    this._setup();
  }

  async _setup() {
    this.doCrawlJob();
  }

  async delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  async doCrawlJob() {
    do {
      try {
        let isWaiting = await this.crawlData();
        if (isWaiting) {
          await this.delay(2000);
        } else {
          await this.delay(500); // 0.5 seconds, to avoid too many requests
        }
      } catch (e) {
        console.log({ e });
        this.logger.error(e.message);
      }
    } while (true);
  }

  /**
   * Step 1: Get the data from the blockchain
   * @returns {Promise<void>}
   */
  async crawlData() {
    return await this.dataSource.transaction(async (manager) => {
      const toBlock = new Date().getTime() / 1000;
      let crawlName = `crawl_${this.chainId}_${this.contractId}`;
      let latestBlockInDb = await manager
        .getRepository(LatestBlock)
        .createQueryBuilder("latest_block")
        .useTransaction(true)
        .where("latest_block.currency = :crawlName", { crawlName })
        .getOne();

      this.logger.debug(`latestBlockInDb: ${JSON.stringify(latestBlockInDb)}`);

      if (!latestBlockInDb) {
        latestBlockInDb = new LatestBlock();
        latestBlockInDb.currency = crawlName;
        latestBlockInDb.blockNumber =
          Number(process.env.SYNC_BLOCK_NUMBER) || 1723278251;
        if (latestBlockInDb.blockNumber) {
          await manager.getRepository(LatestBlock).save(latestBlockInDb);
        }

        await manager.delete(Bond, {
          contractAddress: this.contractId,
        });

        return true;
      }

      const events = await this.getEventsFromMirror(
        [
          EventType.BondCreated,
          EventType.LenderParticipated,
          EventType.LenderClaimed,
          EventType.BorrowerClaimLoanToken,
          EventType.BondRepaid,
          EventType.BorrowerRefundoanToken,
          EventType.BondLiquidated,
        ],
        this.contractId,
        latestBlockInDb ? latestBlockInDb.blockNumber : toBlock,
        toBlock
      );
      for (const eventItem of events) {
        await this.handleEvents(eventItem, manager);
      }

      if (latestBlockInDb && events?.length > 0) {
        latestBlockInDb.blockNumber = Math.floor(toBlock);
        await manager.save(latestBlockInDb);
      }

      return true;
    });
  }

  async handleEvents(
    event: Record<string, Record<string, any>>,
    manager: EntityManager
  ) {
    console.log({ event });
    switch (event?.event?.name) {
      case EventType.BondCreated:
        await this.handleBondCreated(event, manager);
        break;
      case EventType.LenderParticipated:
        await this.handleBondCheckout(event, manager);
        break;
      case EventType.LenderClaimed:
        await this.handleLenderClaimed(event, manager);
        break;
      case EventType.BorrowerClaimLoanToken:
        await this.handleBorrowerClaimedLoan(event, manager);
        break;
      case EventType.BondRepaid:
        await this.handleBondRepaid(event, manager);
        break;
      case EventType.BorrowerRefundoanToken:
        await this.handleBorrowerRefundoanToken(event, manager);
        break;
      case EventType.BondLiquidated:
        await this.handleBondLiquidated(event, manager);
        break;
      default:
        this.logger.debug(
          `Unknown event: ${JSON.stringify(event?.event.name)}`
        );
        break;
    }
  }
  async handleBondCheckout(eventCheckoutBondPayload, manager: EntityManager) {
    const [bondId, lender, amountLend, amountBond] =
      eventCheckoutBondPayload?.event?.args;

    const newBoundCheckout = new BondCheckout();

    newBoundCheckout.bondId = BigNumber.from(bondId).toNumber();
    newBoundCheckout.lenderAddress = lender;
    newBoundCheckout.purchasedAmount = BigNumber.from(amountLend).toNumber();
    newBoundCheckout.bondAmount = BigNumber.from(amountBond).toNumber();
    newBoundCheckout.purchaseDate = new Date();

    this.logger.debug(`newBoundCheckout: ${JSON.stringify(newBoundCheckout)}`);

    await manager
      .createQueryBuilder()
      .insert()
      .into(BondCheckout)
      .values(newBoundCheckout)
      .execute();

    const bond = await manager
      .createQueryBuilder(Bond, "bond")
      .select("bond.totalSold")
      .where("bond.bond_id = :bondId", { bondId: newBoundCheckout.bondId })
      .getOne();

    const newTotalSold = bond.totalSold + newBoundCheckout.bondAmount;
    this.logger.debug(`newTotalSold: ${newTotalSold}`);

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ totalSold: newTotalSold })
      .where("bond_id = :bondId", { bondId: newBoundCheckout.bondId })
      .execute();
  }

  async handleBondCreated(eventBondCreatedPayLoad, manager: EntityManager) {
    const [
      bondId,
      name,
      borrower,
      loanToken,
      loanAmount,
      volumeBond,
      bondDuration,
      borrowerInterestRate,
      lenderInterestRate,
      collateralToken,
      collateralAmount,
      issuanceDate,
      maturityDate,
    ] = eventBondCreatedPayLoad?.event?.args;
    const metaData = eventBondCreatedPayLoad?.meta;

    const newBond = new Bond();
    newBond.bondId = BigNumber.from(bondId).toNumber();
    newBond.name = name;
    newBond.borrowerAddress = borrower;
    newBond.contractAddress = metaData?.address;
    newBond.blockNumber = metaData?.block_number;
    newBond.transactionHash = metaData?.transaction_hash;
    newBond.onchainStatus = OnchainStatus.CONFIRMED;
    newBond.loanToken = loanToken;
    newBond.loanAmount = BigNumber.from(loanAmount).toNumber();
    newBond.volumeBond = BigNumber.from(volumeBond).toNumber();
    newBond.loanTerm = BigNumber.from(bondDuration).toNumber();
    newBond.borrowerInterestRate =
      BigNumber.from(borrowerInterestRate).toNumber() / 10;
    newBond.lenderInterestRate =
      BigNumber.from(lenderInterestRate).toNumber() / 10;
    newBond.collateralToken = collateralToken;
    newBond.collateralAmount = BigNumber.from(collateralAmount).toNumber();
    newBond.issuanceDate = BigNumber.from(issuanceDate).toNumber();
    newBond.maturityDate = BigNumber.from(maturityDate).toNumber();

    await manager
      .createQueryBuilder()
      .insert()
      .into(Bond)
      .values(newBond)
      .orUpdate(
        [
          "name",
          "borrower_address",
          "block_number",
          "transaction_hash",
          "loan_token",
          "loan_amount",
          "volume_bond",
          "loan_term",
          "borrower_interest_rate",
          "lender_interest_rate",
          "collateral_token",
          "collateral_amount",
          "issuance_date",
          "maturity_date",
        ],
        ["bond_id", "contract_address"]
      )
      .execute();
  }
  async handleLenderClaimed(eventLenderClaimedPayload, manager: EntityManager) {
    const [
      bondId,
      lender,
      bondTokenAmount,
      loanTokenAmount,
      interestLoanTokenAmount,
      repaymentAmount,
    ] = eventLenderClaimedPayload?.event?.args;

    const metaData = eventLenderClaimedPayload?.meta;

    const newLenderTransaction = new LenderTransaction();
    newLenderTransaction.bondId = BigNumber.from(bondId).toNumber();
    newLenderTransaction.lenderAddress = lender;
    newLenderTransaction.loanAmount =
      BigNumber.from(loanTokenAmount).toNumber();
    newLenderTransaction.interestPayment = BigNumber.from(
      interestLoanTokenAmount
    ).toNumber();
    newLenderTransaction.receivedAmount =
      BigNumber.from(repaymentAmount).toNumber();
    newLenderTransaction.transactionType = LenderTransactionType.RECEIVED;
    newLenderTransaction.transactionHash = metaData?.transaction_hash;
    newLenderTransaction.status = LenderTransactionStatus.COMPLETED;

    await manager
      .createQueryBuilder()
      .insert()
      .into(LenderTransaction)
      .values(newLenderTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "lender_address", "bond_id"]
      )
      .execute();

    await manager
      .createQueryBuilder()
      .update(BondCheckout)
      .set({
        claimedAt: new Date(),
      })
      .where("bond_id = :bondId", { bondId: newLenderTransaction.bondId })
      .andWhere("lender_address = :lenderAddress", {
        lenderAddress: newLenderTransaction.lenderAddress,
      })
      .execute();
  }
  async handleBorrowerClaimedLoan(
    eventBorrowerClaimedPayload,
    manager: EntityManager
  ) {
    const [bondId, borrower, loanToken, loanAmount] =
      eventBorrowerClaimedPayload?.event?.args;

    const metaData = eventBorrowerClaimedPayload?.meta;

    const bond = await manager
      .createQueryBuilder(Bond, "bond")
      .where("bond.bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .getOne();

    const newBorrowerTransaction = new BorrowerTransaction();
    newBorrowerTransaction.bondId = BigNumber.from(bondId).toNumber();
    newBorrowerTransaction.borrowerAddress = borrower;
    newBorrowerTransaction.loanAmount = BigNumber.from(loanAmount).toNumber();
    newBorrowerTransaction.interestPayment = caculatePercentage(
      bond?.lenderInterestRate,
      BigNumber.from(loanAmount).toNumber()
    );
    newBorrowerTransaction.paymentAmount =
      BigNumber.from(loanAmount).toNumber();
    newBorrowerTransaction.collateralAmount = bond.collateralAmount;
    newBorrowerTransaction.transactionHash = metaData?.transaction_hash;
    newBorrowerTransaction.status = BorrowerTransactionStatus.COMPLETED;
    newBorrowerTransaction.transactionType =
      BorrowerTransactionType.LOAN_CLAIMED;

    const claimedLoanAt = new Date();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ claimedLoanAt })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();

    await manager
      .createQueryBuilder()
      .insert()
      .into(BorrowerTransaction)
      .values(newBorrowerTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "borrower_address", "bond_id"]
      )
      .execute();
  }

  async handleBondRepaid(eventBondRepaidPayload, manager: EntityManager) {
    const [
      bondId,
      borrower,
      totalLend,
      repaymentAmount,
      interestPaid,
      collateralReturnedAmount,
    ] = eventBondRepaidPayload?.event?.args;
    const metaData = eventBondRepaidPayload?.meta;
    const newBorrowerTransaction = new BorrowerTransaction();
    newBorrowerTransaction.bondId = BigNumber.from(bondId).toNumber();
    newBorrowerTransaction.borrowerAddress = borrower;
    newBorrowerTransaction.loanAmount =
      BigNumber.from(repaymentAmount).toNumber();
    newBorrowerTransaction.interestPayment =
      BigNumber.from(interestPaid).toNumber();
    newBorrowerTransaction.paymentAmount = BigNumber.from(totalLend).toNumber();
    newBorrowerTransaction.transactionHash = metaData?.transaction_hash;
    newBorrowerTransaction.collateralAmount = BigNumber.from(
      collateralReturnedAmount
    ).toNumber();
    newBorrowerTransaction.status = BorrowerTransactionStatus.COMPLETED;
    newBorrowerTransaction.transactionType =
      BorrowerTransactionType.LOAN_REPAYMENT;

    const repaidAt = new Date();
    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ repaidAt })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();
    await manager
      .createQueryBuilder()
      .insert()
      .into(BorrowerTransaction)
      .values(newBorrowerTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "borrower_address", "bond_id"]
      )
      .execute();
  }

  async handleBorrowerRefundoanToken(
    eventBorrowerRefundoanTokenPayload,
    manager: EntityManager
  ) {
    const [bondId, borrower, collateralToken, collateralAmount] =
      eventBorrowerRefundoanTokenPayload?.event?.args;

    const metaData = eventBorrowerRefundoanTokenPayload?.meta;
    const newBorrowerTransaction = new BorrowerTransaction();
    newBorrowerTransaction.bondId = BigNumber.from(bondId).toNumber();
    newBorrowerTransaction.borrowerAddress = borrower;
    newBorrowerTransaction.loanAmount = 0;
    newBorrowerTransaction.interestPayment = 0;
    newBorrowerTransaction.paymentAmount = 0;
    newBorrowerTransaction.collateralAmount =
      BigNumber.from(collateralAmount).toNumber();
    newBorrowerTransaction.transactionHash = metaData?.transaction_hash;
    newBorrowerTransaction.status = BorrowerTransactionStatus.COMPLETED;
    newBorrowerTransaction.transactionType =
      BorrowerTransactionType.REFUND_COLLATERAL;

    await manager
      .createQueryBuilder()
      .insert()
      .into(BorrowerTransaction)
      .values(newBorrowerTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "borrower_address", "bond_id"]
      )
      .execute();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ canceledAt: new Date() })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();
  }
  async handleBondLiquidated(
    eventBondLiquidatedPayload,
    manager: EntityManager
  ) {
    const [
      bondId,
      borrower,
      collateralAmount,
      currentCollateralValue,
      loanTokenReceived,
      repaymentAmount,
      excessRefund,
    ] = eventBondLiquidatedPayload?.event?.args;

    const metaData = eventBondLiquidatedPayload?.meta;
    const newBorrowerTransaction = new BorrowerTransaction();
    newBorrowerTransaction.bondId = BigNumber.from(bondId).toNumber();
    newBorrowerTransaction.borrowerAddress = borrower;
    newBorrowerTransaction.loanAmount = 0;
    newBorrowerTransaction.interestPayment = 0;
    newBorrowerTransaction.paymentAmount = 0;
    newBorrowerTransaction.collateralAmount =
      BigNumber.from(collateralAmount).toNumber();
    newBorrowerTransaction.transactionHash = metaData?.transaction_hash;
    newBorrowerTransaction.status = BorrowerTransactionStatus.COMPLETED;
    newBorrowerTransaction.transactionType = BorrowerTransactionType.LIQUIDATED;

    await manager
      .createQueryBuilder()
      .insert()
      .into(BorrowerTransaction)
      .values(newBorrowerTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "borrower_address", "bond_id"]
      )
      .execute();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ liquidatedAt: new Date() })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();
  }

  async getEventsFromMirror(
    eventNames: string[],
    contractId: string,
    blockNumber: number,
    toBlock: number
  ) {
    const dataEmit = [];
    const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/${contractId}/results/logs?order=asc&timestamp=gt:${blockNumber}&timestamp=lt:${toBlock}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.logs.length > 0) {
        data.logs.forEach((log) => {
          const event = this.decodeEvent(log.data, log.topics);
          if (event && eventNames.includes(event.name)) {
            dataEmit.push({ event, meta: log });
          }
        });
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return dataEmit;
  }

  private decodeEvent(data: string, topics: string[]) {
    const iface = new ethers.utils.Interface(abi);

    const parsedLog = iface.parseLog({
      data,
      topics,
    });
    return parsedLog;
  }
}
