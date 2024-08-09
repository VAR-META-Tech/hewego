import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DataSource } from "typeorm";
import { databaseConfig } from "./config/database.config";
import { WorkerModule } from "./modules/worker/worker.module";
import { TokenModule } from '../../server/src/modules/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    WorkerModule,
    TokenModule,
  ],
  controllers: [],
})
export class AppWorkerModule {
  constructor(private dataSource: DataSource) {}
}
