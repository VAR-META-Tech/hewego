import { OnchainStatus } from "../../shared/enums";
import { Bond, LatestBlock } from "../../database/entities";
import { DataSource, EntityManager } from "typeorm";
import { Logger } from "@nestjs/common";
const Web3 = require("web3");
const axios = require("axios");

import abi from "../contract/BondIssuance.json";
import {
  convertToHederaAccountId,
} from "../../shared/Utils";
import { ethers } from "ethers";
const web3 = new Web3();

export class HederaWorkerV2Service {
  private logger = new Logger(HederaWorkerV2Service.name);
  _adminAddress = null;
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
      let crawlName = `crawl_${this.chainId}_${this.contractId}`
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
        latestBlockInDb.blockNumber = Number(process.env.SYNC_BLOCK_NUMBER) || 1723278251;
        if (latestBlockInDb.blockNumber) {
          await manager.getRepository(LatestBlock).save(latestBlockInDb);
        }

        await manager.delete(Bond, {
          contractAddress: this.contractId,
        });

        return 1;
      }

      const data = await this.getEventsFromMirror(
        this.contractId,
        latestBlockInDb ? latestBlockInDb.blockNumber : toBlock,
        toBlock,
        manager
      );

      for (const item of data) {
        if (item) {
          const { event, meta } = item;
          this.logger.debug({ event, meta });
          // Handling different event types based on the event name
          switch (event.eventName) {
            case "BondCreated":
              const {
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
              } = event;
              const bondCreatedEventData: Partial<Bond> = {
                bondId,
                name,
                borrowerAddress: borrower,
                contractAddress: meta.address,
                blockNumber: meta.block_number,
                transactionHash: meta.transaction_hash,
                onchainStatus: OnchainStatus.CONFIRMING,
                loanToken,
                loanAmount,
                volumeBond,
                loanTerm: bondDuration,
                borrowerInterestRate,
                lenderInterestRate,
                collateralToken,
                collateralAmount,
                issuanceDate,
                maturityDate,
              };
              this.logger.debug({ bondCreatedEventData });
              await this.handleBondCreated(bondCreatedEventData, manager);

              break;

            case "BondUpdated":
              // Handle BondUpdated event

              break;

            // Add cases for other events as needed

            default:
              this.logger.warn(`Unhandled event type: ${meta.eventName}`);
              break;
          }
        }
      }

      if (latestBlockInDb && data && data.length > 0) {
        latestBlockInDb.blockNumber = Math.floor(toBlock);
        await manager.save(latestBlockInDb);

        const bondIds = data?.map((item) => item.event.bondId);
        if (bondIds.length > 0) {
          await manager
            .createQueryBuilder()
            .update(Bond)
            .set({ onchainStatus: OnchainStatus.CONFIRMED })
            .where("bond_id IN (:...bondIds)", { bondIds })
            .execute();
        }
      }

      return true;
    });
  }
  async handleBondCreated(eventData: Partial<Bond>, manager: EntityManager) {
    const {
      bondId,
      name,
      blockNumber,
      transactionHash,
      onchainStatus,
      contractAddress,
      borrowerAddress,
      loanToken,
      loanAmount,
      volumeBond,
      loanTerm,
      borrowerInterestRate,
      lenderInterestRate,
      collateralToken,
      collateralAmount,
      issuanceDate,
      maturityDate,
    } = eventData;

    // const borrowerAccountId = convertToHederaAccountId(borrowerAddress);

    // const parseLoanAmount = parseFloat(
    //   ethers.utils.formatUnits(loanAmount, 18)
    // ).toFixed(0);
    // const parsecollateralAmount = parseFloat(
    //   ethers.utils.formatUnits(collateralAmount, 18)
    // ).toFixed(0);

    // this.logger.debug(`
    //   ParseLoanAmount: ${parseLoanAmount} , ParseCollateralAmount: ${parsecollateralAmount}
    // `);

    await manager
      .createQueryBuilder()
      .insert()
      .into(Bond)
      .values({
        bondId,
        name,
        borrowerAddress,
        contractAddress,
        blockNumber,
        transactionHash,
        onchainStatus,
        loanToken,
        loanAmount,
        volumeBond,
        loanTerm,
        borrowerInterestRate:  borrowerInterestRate/10,
        lenderInterestRate: lenderInterestRate/10,
        collateralToken,
        collateralAmount,
        issuanceDate,
        maturityDate,
      })
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

  async getEventsFromMirror(contractId, blockNumber, toBlock, manager) {
    const dataEmit = [];
    const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/${contractId}/results/logs?order=asc&timestamp=gt:${blockNumber}&timestamp=lt:${toBlock}`;
    try {
      const response = await axios.get(url);
      const jsonResponse = response.data;
      this.logger.debug({ jsonResponse });

      if (jsonResponse && jsonResponse.logs.length > 0) {
        this.logger.debug(JSON.stringify(jsonResponse));

        jsonResponse.logs.forEach((log) => {
          const events = this.decodeEvents(log.data, log.topics);
          events.forEach((event) => {
            if (event) {
              dataEmit.push({ event, meta: log });
            }
          });
        });
      }
    } catch (err) {
      this.logger.error(err);
    }
    return dataEmit;
  }

  decodeEvents(log, topics) {
    const decodedEvents = [];

    abi.forEach((eventAbi) => {
      if (eventAbi.type === "event") {
        try {
          if (eventAbi.name === "BondCreated") {
            const decodedLog = web3.eth.abi.decodeLog(
              eventAbi.inputs,
              log,
              topics.slice(1)
            );
            this.logger.debug({ decodedLog });
            const buildDecodeEvent = {
              ...decodedLog,
              eventName: eventAbi.name,
            };
            decodedEvents.push(JSON.parse(JSON.stringify(buildDecodeEvent)));
          }
        } catch (e) {
          this.logger.error(
            `Decoding error for event ${eventAbi.name}: ${e.message}`
          );
        }
      }
    });

    return decodedEvents;
  }
}
