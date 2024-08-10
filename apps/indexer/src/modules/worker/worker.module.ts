import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bond, BondCheckout, LatestBlock } from "../../database/entities";
import { WorkerManagerService } from "./worker-manager.service";

@Module({
  imports: [TypeOrmModule.forFeature([Bond, BondCheckout, LatestBlock])],
  controllers: [],
  exports: [],
  providers: [WorkerManagerService],
})
export class WorkerModule {}
