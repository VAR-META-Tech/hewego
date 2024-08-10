import { OnchainStatus } from "../../shared/enums";
import * as _ from "lodash";
import { Bond, LatestBlock } from "../../database/entities";
import { DataSource } from "typeorm";
import { Logger } from "@nestjs/common";
const Web3 = require("web3");
const fs = require("fs");
const axios = require("axios");

import abi from "../contract/BondIssuance.json";
import { convertToHederaAccountId } from "../../shared/Utils";
console.log(abi);
const web3 = new Web3();
export class HederaWorkerService {
  private logger = new Logger(HederaWorkerService.name);
  _addminAddress = null;
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
      console.log(latestBlockInDb);
      const contractId = "0.0.4661188";
      const data = await this.getEventsFromMirror(
        contractId,
        latestBlockInDb ? latestBlockInDb.blockNumber : toBlock,
        toBlock,
        manager
      );

      for (const item of data) {
        if (item) {
          const { event, meta } = item;
          const { bondId, name, borrower } = event;
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
        }
      }
      if (latestBlockInDb && data && data.length > 0) {
        latestBlockInDb.blockNumber = Math.floor(toBlock);
        await manager.save(latestBlockInDb);

        const bondIds = data.map((item) =>item.event.bondId);
        await manager
          .createQueryBuilder()
          .update(Bond)
          .set({ onchainStatus: OnchainStatus.CONFIRMED })
          .where("bond_id IN (:...bondIds)", { bondIds })
          .execute();
      }

      return true;
    });
  }
  async getEventsFromMirror(contractId, blockNumber, toBlock, manager) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const dataEmit = [];
    const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/${contractId.toString()}/results/logs?order=asc&timestamp=gt:${blockNumber}&timestamp=lt:${toBlock}`;
    try {
      const response = await axios.get(url);
      const jsonResponse = response.data;
      console.log(0, jsonResponse);
      if (jsonResponse && jsonResponse.logs.length > 0) {
        // const timestamp =
        //   jsonResponse.logs[jsonResponse.logs.length - 1].timestamp;
        // const timestampFloat = parseFloat(timestamp);
        // const timestampInt = Math.floor(timestampFloat);
        // this.logger.debug(`timestampInt: ${timestampInt}`);
        // await manager
        //   .createQueryBuilder()
        //   .update("latest_block")
        //   .set({ blockNumber: timestampInt })
        //   .where("currency = :currency", { currency: "HBAR" })
        //   .execute();
      }
      this.logger.debug(JSON.stringify(jsonResponse));

      jsonResponse.logs.forEach((log) => {
        const event = this.decodeEvent("BondCreated", log.data, log.topics);
        console.log("event", event);
        if (event) {
          dataEmit.push({ event, meta: log });
        }
      });
    } catch (err) {
      this.logger.error(err);
    }
    return dataEmit;
  }
  decodeEvent = (eventName, log, topics) => {
    try {
      // Find the event ABI based on the event name and type
      const eventAbi = abi.find(
        (event) => event.name === eventName && event.type === "event"
      );

      // If the event ABI is not found, log an error and return null
      if (!eventAbi) {
        this.logger.error(`Event ABI not found for event: ${eventName}`);
        return null;
      }

      // Log the incoming data for debugging purposes
      this.logger.debug(`Log data:, ${JSON.stringify(log)}`);
      this.logger.debug(`Log topics:", ${JSON.stringify(topics)}`);

      // Decode the log using the found event ABI
      const decodedLog = web3.eth.abi.decodeLog(
        eventAbi.inputs,
        log,
        topics[1]
      );
      console.log("Decoded log:", decodedLog);

      // Return the decoded log, ensuring no circular references
      return JSON.parse(JSON.stringify(decodedLog));
    } catch (e) {
      // Handle any errors that occur during decoding
      this.logger.error(`Decoding error: ${e.message}`);
      return null;
    }
  };
}
