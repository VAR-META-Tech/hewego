import { Module } from '@nestjs/common';
import { LenderTransactionController } from './lenderTransaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Bond,
  BorrowerTransaction,
  LenderTransaction,
  Transaction,
} from 'database/entities';
import { BorrowerTransactionController } from './borrowerTransaction.controller';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LenderTransaction,
      Bond,
      BorrowerTransaction,
      Transaction,
    ]),
  ],
  controllers: [
    LenderTransactionController,
    BorrowerTransactionController,
    TransactionController,
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
