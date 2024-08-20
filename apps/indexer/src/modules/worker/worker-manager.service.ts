import { Injectable, Logger } from "@nestjs/common";
import * as _ from "lodash";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { HederaWorkerService } from "./hedera-worker.service";

const logger = new Logger("WorkerManagerService");

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
