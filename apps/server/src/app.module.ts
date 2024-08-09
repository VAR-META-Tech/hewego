import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { DataSource } from 'typeorm';
// import { addTransactionalDataSource } from 'typeorm-transactional';

import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ExceptionFilter } from './filters/exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { BondModule } from 'modules/bond/bond.module';
import { Token } from 'database/entities';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
    AuthModule,
    BondModule,
    Token,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
