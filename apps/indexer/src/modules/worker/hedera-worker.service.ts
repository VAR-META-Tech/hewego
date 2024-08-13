import { EventType, OnchainStatus } from "../../shared/enums";
import { Bond, BondCheckout, LatestBlock } from "../../database/entities";
import { DataSource, EntityManager } from "typeorm";
import { Logger } from "@nestjs/common";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import abi from "../contract/BondIssuance.json";

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
        [EventType.BondCreated, EventType.LenderParticipated],
        this.contractId,
        latestBlockInDb ? latestBlockInDb.blockNumber : toBlock,
        toBlock
      );
      await Promise.all(
        events.map((eventItem) => this.handleEvents(eventItem, manager))
      );

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
    switch (event?.event?.name) {
      case EventType.BondCreated:
        await this.handleBondCreated(event, manager);
        break;
      case EventType.LenderParticipated:
        await this.handleBondCheckout(event, manager);
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
    newBond.volumeBond = BigNumber.from(volumeBond).toNumber()/10;
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
