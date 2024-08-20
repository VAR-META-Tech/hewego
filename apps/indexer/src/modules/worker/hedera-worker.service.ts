import {
  BorrowerTransactionStatus,
  BorrowerTransactionType,
  EventType,
  LenderTransactionStatus,
  LenderTransactionType,
  OnchainStatus,
  TransactionStatus,
  TransactionType,
} from "../../shared/enums";
import {
  Bond,
  BondCheckout,
  LatestBlock,
  Transaction,
} from "../../database/entities";
import { DataSource, EntityManager } from "typeorm";
import { Logger } from "@nestjs/common";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import abi from "../contract/BondIssuance.json";

export class HederaWorkerService {
  private logger = new Logger(HederaWorkerService.name);
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
      const toBlock = new Date().getTime() / 1000 - 5;
      this.logger.debug({ toBlock });
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
          EventType.CollateralAdded,
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
      case EventType.CollateralAdded:
        await this.handleCollateralAdded(event, manager);
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

    const metaData = eventCheckoutBondPayload?.meta;

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

    const newTransaction = manager.create(Transaction, {
      bondId: BigNumber.from(bondId).toNumber(),
      amount: BigNumber.from(amountLend).toNumber(),
      userWalletAddress: lender,
      transactionHash: metaData?.transaction_hash,
      transactionType: TransactionType.SUPPLIED,
      status: TransactionStatus.COMPLETED,
    });

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
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

    const newTransaction = manager.create(Transaction, {
      bondId: BigNumber.from(bondId).toNumber(),
      amount: BigNumber.from(loanAmount).toNumber(),
      userWalletAddress: borrower,
      transactionHash: metaData?.transaction_hash,
      transactionType: TransactionType.CREATED,
      status: TransactionStatus.COMPLETED,
    });

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
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

    const newTransaction = manager.create(Transaction, {
      bondId: BigNumber.from(bondId).toNumber(),
      amount: BigNumber.from(repaymentAmount).toNumber(),
      userWalletAddress: lender,
      transactionHash: metaData?.transaction_hash,
      transactionType: TransactionType.LENDER_CLAIMED,
      status: TransactionStatus.COMPLETED,
    });

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
      .execute();

    await manager
      .createQueryBuilder()
      .update(BondCheckout)
      .set({
        claimedAt: new Date(),
      })
      .where("bond_id = :bondId", { bondId: BigNumber.from(bondId).toNumber() })
      .andWhere("lender_address = :lenderAddress", {
        lenderAddress: lender,
      })
      .execute();
  }
  async handleBorrowerClaimedLoan(
    eventBorrowerClaimedPayload,
    manager: EntityManager
  ) {
    const {
      event: {
        args: [bondId, borrower, loanToken, loanAmount],
      },
      meta: { transaction_hash: transactionHash },
    } = eventBorrowerClaimedPayload;

    const bondIdNumber = BigNumber.from(bondId).toNumber();
    const loanAmountNumber = BigNumber.from(loanAmount).toNumber();

    const newTransaction = manager.create(Transaction, {
      bondId: bondIdNumber,
      amount: loanAmountNumber,
      userWalletAddress: borrower,
      transactionHash,
      status: TransactionStatus.COMPLETED,
      transactionType: TransactionType.BORROWER_CLAIMED,
    });

    const claimedLoanAt = new Date();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ claimedLoanAt })
      .where("bond_id = :bondId", { bondId: bondIdNumber })
      .execute();

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
      .execute();
  }

  async handleBondRepaid(eventBondRepaidPayload, manager: EntityManager) {
    const {
      event: {
        args: [
          bondId,
          borrower,
          totalLend,
          repaymentAmount,
          interestPaid,
          collateralReturnedAmount,
        ],
      },
      meta: { transaction_hash: transactionHash },
    } = eventBondRepaidPayload;

    const bondIdNumber = BigNumber.from(bondId).toNumber();
    const repaymentAmountNumber = BigNumber.from(repaymentAmount).toNumber();

    const newTransaction = manager.create(Transaction, {
      bondId: bondIdNumber,
      amount: repaymentAmountNumber,
      userWalletAddress: borrower,
      transactionHash,
      status: TransactionStatus.COMPLETED,
      transactionType: TransactionType.REPAID,
    });

    const repaidAt = new Date();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({ repaidAt, repaidAmount: repaymentAmountNumber })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
      .execute();
  }

  async handleBorrowerRefundoanToken(
    eventBorrowerRefundoanTokenPayload,
    manager: EntityManager
  ) {
    const {
      event: {
        args: [bondId, borrower, collateralToken, collateralAmount],
      },
      meta: { transaction_hash: transactionHash },
    } = eventBorrowerRefundoanTokenPayload;

    const bondIdNumber = BigNumber.from(bondId).toNumber();
    const refundAmount = BigNumber.from(collateralAmount).toNumber();

    const newTransaction = manager.create(Transaction, {
      bondId: bondIdNumber,
      amount: refundAmount,
      userWalletAddress: borrower,
      transactionHash,
      status: TransactionStatus.COMPLETED,
      transactionType: TransactionType.CANCELED,
    });

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
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
    const {
      event: {
        args: [
          bondId,
          borrower,
          collateralAmount,
          currentCollateralValue,
          loanTokenReceived,
          repaymentAmount,
          excessRefund,
        ],
      },
      meta: { transaction_hash: transactionHash },
    } = eventBondLiquidatedPayload;

    const bondIdNumber = BigNumber.from(bondId).toNumber();

    const newTransaction = manager.create(Transaction, {
      bondId: bondIdNumber,
      amount: BigNumber.from(repaymentAmount).toNumber(),
      userWalletAddress: borrower,
      transactionHash,
      status: TransactionStatus.COMPLETED,
      transactionType: TransactionType.COLLATERAL_REFUNDED,
    });

    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
      .execute();

    await manager
      .createQueryBuilder()
      .update(Bond)
      .set({
        liquidatedAt: new Date(),
        liquidatedAmount: BigNumber.from(repaymentAmount || 0).toNumber(),
      })
      .where("bond_id = :bondId", {
        bondId: BigNumber.from(bondId).toNumber(),
      })
      .execute();
  }
  async handleCollateralAdded(
    eventCollateralAddedPayload,
    manager: EntityManager
  ) {
    const {
      event: {
        args: [
          bondId,
          borrower,
          collateralToken,
          additionalCollateralAmount,
          newCollateralAmount,
        ],
      },
      meta: { transaction_hash: transactionHash },
    } = eventCollateralAddedPayload;

    const newTransaction = manager.create(Transaction, {
      bondId: BigNumber.from(bondId).toNumber(),
      userWalletAddress: borrower,
      amount: BigNumber.from(newCollateralAmount).toNumber(),
      transactionHash,
      status: TransactionStatus.COMPLETED,
      transactionType: TransactionType.COLLATERAL_DEPOSITED,
    });
    await manager
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(newTransaction)
      .orUpdate(
        ["transaction_hash", "status"],
        ["transaction_hash", "user_wallet_address", "bond_id"]
      )
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
