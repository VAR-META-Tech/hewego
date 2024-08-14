import { Module } from '@nestjs/common';
import { LenderTransactionController } from './lenderTransaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Bond,
  BorrowerTransaction,
  LenderTransaction,
} from 'database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([LenderTransaction, Bond, BorrowerTransaction]),
  ],
  controllers: [LenderTransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
