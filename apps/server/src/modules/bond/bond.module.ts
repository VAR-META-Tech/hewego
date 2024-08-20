import { Module } from '@nestjs/common';
import { BondService } from './bond.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from 'database/entities/Bond.entity';
import { BondController } from './bond.controller';
import { PortfolioController } from './portfolio.controller';
import {
  BondCheckout,
  LenderTransaction,
  Transaction,
} from 'database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bond,
      BondCheckout,
      LenderTransaction,
      Transaction,
    ]),
  ],
  providers: [BondService],
  controllers: [BondController, PortfolioController],
  exports: [BondService],
})
export class BondModule {}
