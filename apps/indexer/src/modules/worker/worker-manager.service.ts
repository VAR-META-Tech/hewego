import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectDataSource } from "@nestjs/typeorm";
import { getLogger } from "../../shared/logger";
import { DataSource } from "typeorm";
import { HederaWorkerService } from "./hedera-worker.service";
import { HederaWorkerV2Service } from "./hedera-worker-v2.service";
const logger = getLogger("WorkerManagerService");

@Injectable()
export class WorkerManagerService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {
    this.init();
  }

  async init() {
    // new HederaWorkerService(this.dataSource);
    new HederaWorkerV2Service(this.dataSource);
  }

  runWorker(_cb: () => void) {
    try {
      _cb();
    } catch (error) {
      logger.error(error);
    }
  }
}
