import { DataSourceOptions } from "typeorm";
import { Bond, BondCheckout, LatestBlock, User } from "../database/entities";
import { Token } from "../../../server/src/database/entities/Token.entity";

export const databaseConfig: DataSourceOptions = {
  type: process.env.DB_TYPE || ("postgres" as any),
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Bond, LatestBlock, BondCheckout, User, Token],
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: true,
};
