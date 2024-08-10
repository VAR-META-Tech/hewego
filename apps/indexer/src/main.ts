require("dotenv").config();

import { NestFactory } from "@nestjs/core";
import { debugLog, logger } from "./shared/logger";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppWorkerModule } from "./app-worker.module";
import cookieParser from "cookie-parser";

let nest: NestExpressApplication;
const port = process.env.PORT || 3001;

async function bootstrap() {
  nest = await NestFactory.create(AppWorkerModule);
  debugLog(`Worker is running`);

  nest.use(logger);
  nest.use(cookieParser());
  // nest.enableCors();
  nest.useGlobalPipes(new ValidationPipe());
  nest.listen(port, () => {
    debugLog(`Application type ${process.env.NODE_ENV} is running on: ${port}`);
  });
}

bootstrap();
