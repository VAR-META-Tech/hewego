import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bond, LenderTransaction, Token, User } from 'database/entities';
import { Repository } from 'typeorm';
import { FindManyLenderTransactionParamsDto } from './dto/findManyLenderTransactionParams.dto';
import { TokenTypeEnum } from 'shared/enum';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LenderTransactionItemResponseDto } from './dto/lenderTransactionItemResponse.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
    @InjectRepository(LenderTransaction)
    private lenderTransactionRepository: Repository<LenderTransaction>,
  ) {}

  async getLenderTransactionHistoriesWithPageable(
    params: FindManyLenderTransactionParamsDto,
    user: User,
  ): Promise<Pagination<LenderTransactionItemResponseDto>> {
    try {
      const loanTokenType = TokenTypeEnum.LOAN;
      const queryBuilder = this.lenderTransactionRepository
        .createQueryBuilder('lender_transaction')
        .leftJoinAndSelect(Bond, 'bond', 'bond.id = lender_transaction.bond_id')
        .leftJoinAndSelect(
          Token,
          'token',
          'token.address = bond.loan_token AND token.type = :tokenType',
          {
            tokenType: loanTokenType,
          },
        )
        .select([
          'lender_transaction.id AS "id"',
          'lender_transaction.transaction_type AS "transactionType"',
          'lender_transaction.lenderAddress AS "lenderAddress"',
          'lender_transaction.loanAmount AS "loanAmount"',
          'lender_transaction.interestPayment AS "interestPayment"',
          'lender_transaction.receivedAmount AS "receivedAmount"',
          'lender_transaction.status AS "status"',
          'lender_transaction.transactionHash AS "transactionHash"',
          'lender_transaction.createdAt AS "createdAt"',
          'bond.name AS "bondName"',
          'bond.id AS "bondId"',
          'bond.loan_token AS "loanToken"',
          'token.symbol AS "loanTokenType"',
        ])

        .where(
          'LOWER(lender_transaction.lenderAddress) = LOWER(:lenderAddress)',
          {
            lenderAddress: user.walletAddress,
          },
        )
        .orderBy('lender_transaction.createdAt', 'DESC');
      if (params?.searchTransactionHash) {
        queryBuilder.where(
          'lender_transaction.transactionHash LIKE :transactionHash',
          { transactionHash: `%${params.searchTransactionHash}%` },
        );
      }
      if (params?.supplies) {
        const supplies = params.supplies;
        queryBuilder.andWhere('bond.loan_token IN (:...supplies)', {
          supplies,
        });
      }
      const totalLenderTransaction = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedLenderTransaction = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<LenderTransactionItemResponseDto>(
        selectedLenderTransaction,
        totalLenderTransaction,
        { page, limit },
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
