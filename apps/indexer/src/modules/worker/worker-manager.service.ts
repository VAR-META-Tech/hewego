import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectDataSource } from "@nestjs/typeorm";
import { getLogger } from "../../shared/logger";
import { DataSource } from "typeorm";
import { HederaWorkerService } from "./hedera-worker.service";

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
    new HederaWorkerService(this.dataSource);
  }

  runWorker(_cb: () => void) {
    try {
      _cb();
    } catch (error) {
      logger.error(error);
    }
  }
}
