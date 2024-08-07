import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';

import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';

import { SharedModule } from './shared/shared.module';

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const logger = new Logger('API');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  // const reflector = app.get(Reflector);

  // app.useGlobalFilters(
  //   new HttpExceptionFilter(reflector),
  //   new QueryFailedFilter(reflector),
  // );

  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(reflector),
  //   new TranslationInterceptor(
  //     app.select(SharedModule).get(TranslationService),
  //   ),
  // );
  app.setGlobalPrefix('api');

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //     transform: true,
  //     dismissDefaultMessages: true,
  //     exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  //   }),
  // );

  const configService = app.select(SharedModule).get(ApiConfigService);

  // only start nats if it is enabled
  if (configService.natsEnabled) {
    const natsConfig = configService.natsConfig;
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        url: `nats://${natsConfig.host}:${natsConfig.port}`,
        queue: 'main_service',
      },
    });

    await app.startAllMicroservices();
  }

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = configService.appConfig.port;
  await app.listen(port);

  logger.log(`App running on port: ${port}`);

  return app;
}

void bootstrap();
