require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import { AppWorkerModule } from "./app-worker.module";

const port = process.env.PORT || 3001;

async function bootstrap() {
  const logger = new Logger("INDEXER")
  const nest = await NestFactory.create(AppWorkerModule);

  nest.useGlobalPipes(new ValidationPipe());
  nest.listen(port, () => {
    logger.debug(`Application type ${process.env.NODE_ENV} is running on: ${port}`);
  });
}

bootstrap();
