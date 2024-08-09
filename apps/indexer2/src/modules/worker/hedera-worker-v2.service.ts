import { OnchainStatus } from "../../shared/enums";
import * as _ from "lodash";
import { Bond, LatestBlock } from "../../database/entities";
import { DataSource } from "typeorm";
import { Logger } from "@nestjs/common";
const Web3 = require("web3");
const axios = require("axios");

import abi from "../contract/BondIssuance.json";
import { convertToHederaAccountId } from "src/shared/Utils";
import { eventNames } from "process";

const web3 = new Web3();

export class HederaWorkerV2Service {
  private logger = new Logger(HederaWorkerV2Service.name);
  _adminAddress = null;
  public isStopped = false;
  public isDelisted = false;

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
        console.log(e);
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
      let latestBlockInDb = await manager
        .getRepository(LatestBlock)
        .createQueryBuilder("latest_block")
        .useTransaction(true)
        .where("latest_block.currency = :chain", { chain: "HBAR" })
        .getOne();

      this.logger.debug(`latestBlockInDb: ${JSON.stringify(latestBlockInDb)}`);
      const contractId = process.env.CONTRACT_ID || "0.0.4661188";

      const data = await this.getEventsFromMirror(
        contractId,
        latestBlockInDb ? latestBlockInDb.blockNumber : toBlock,
        toBlock,
        manager
      );
      console.log({ data });

      for (const item of data) {
        if (item) {
          const { event, meta } = item;
          console.log({ meta });
          // Handling different event types based on the event name
          switch (event.eventName) {
            case "BondCreated":
              const { bondId, name, borrower } = event;
              console.log({ event });
              const borrowerAccountId = convertToHederaAccountId(borrower);

              await manager
                .createQueryBuilder()
                .insert()
                .into(Bond)
                .values({
                  bondId,
                  name,
                  borrowerAddress: borrowerAccountId,
                  contractAddress: meta.address,
                  blockNumber: meta.block_number,
                  transactionHash: meta.transaction_hash,
                  onchainStatus: OnchainStatus.CONFIRMING,
                })
                .orUpdate(
                  [
                    "name",
                    "borrower_address",
                    "contract_address",
                    "block_number",
                    "transaction_hash",
                  ],
                  ["bond_id"]
                )
                .execute();
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

  async getEventsFromMirror(contractId, blockNumber, toBlock, manager) {
    const dataEmit = [];
    const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/${contractId}/results/logs?order=asc&timestamp=gt:${blockNumber}&timestamp=lt:${toBlock}`;
    try {
      const response = await axios.get(url);
      const jsonResponse = response.data;
      console.log(0, jsonResponse);

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
              topics.slice(1) // Remove the first topic which is the event signature
            );
            console.log(`Decoded event ${eventAbi.name}:`, decodedLog);
            const buildDecodeEvent = {
              ...decodedLog,
              eventName: eventAbi.name,
            };

            // Return the decoded log, ensuring no circular references
            decodedEvents.push(JSON.parse(JSON.stringify(buildDecodeEvent)));
          }
        } catch (e) {
          // Handle any errors that occur during decoding
          this.logger.error(
            `Decoding error for event ${eventAbi.name}: ${e.message}`
          );
        }
      }
    });

    return decodedEvents;
  }
}
