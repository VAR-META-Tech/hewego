import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Bond,
  BorrowerTransaction,
  LenderTransaction,
  Token,
  Transaction,
  User,
} from 'database/entities';
import { Repository } from 'typeorm';
import { FindManyLenderTransactionParamsDto } from './dto/findManyLenderTransactionParams.dto';
import { TokenTypeEnum, TransactionType } from 'shared/enum';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LenderTransactionItemResponseDto } from './dto/lenderTransactionItemResponse.dto';
import { BorrowerTransactionItemResponseDto } from './dto/borrowerTransactionItemResponse.dto';
import { FindManyBorrowerTransactionParams } from './dto/findManyBorrowerTransactionParams.dto';
import { FindManyTransactionParamsDto } from './dto/findManyTransactionParams.dto';
import { TransactionItemResponseDto } from './dto/transactionItemResponse.dto';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
    @InjectRepository(LenderTransaction)
    private lenderTransactionRepository: Repository<LenderTransaction>,
    @InjectRepository(BorrowerTransaction)
    private borrowerTransactionRepository: Repository<BorrowerTransaction>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<BorrowerTransaction>,
  ) {}

  async getLenderTransactionHistoriesWithPageable(
    params: FindManyLenderTransactionParamsDto,
    user: User,
  ): Promise<Pagination<LenderTransactionItemResponseDto>> {
    try {
      const loanTokenType = TokenTypeEnum.LOAN;
      const queryBuilder = this.lenderTransactionRepository
        .createQueryBuilder('lender_transaction')
        .leftJoinAndSelect(
          Bond,
          'bond',
          'bond.bond_id = lender_transaction.bond_id',
        )
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
          'bond.bond_id AS "bondId"',
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

  async getBorrowerTransactionHistoriesWithPageable(
    params: FindManyBorrowerTransactionParams,
    user: User,
  ): Promise<Pagination<BorrowerTransactionItemResponseDto>> {
    try {
      const queryBuilder = this.borrowerTransactionRepository
        .createQueryBuilder('borrower_transaction')
        .leftJoinAndSelect(
          Bond,
          'bond',
          'bond.bodn_id = borrower_transaction.bond_id',
        )
        .leftJoinAndSelect(
          'tokens',
          'loanToken',
          'bond.loan_token = loanToken.address',
        )
        .leftJoinAndSelect(
          'tokens',
          'tokenToken',
          'bond.collateral_token = tokenToken.address',
        )
        .select([
          'borrower_transaction.id AS "id"',
          'borrower_transaction.transaction_type AS "transactionType"',
          'borrower_transaction.borrowerAddress AS "borrowerAddress"',
          'borrower_transaction.loan_amount AS "loanAmount"',
          'borrower_transaction.interest_payment AS "interestPayment"',
          'borrower_transaction.received_amount AS "receivedAmount"',
          'borrower_transaction.status AS "status"',
          'borrower_transaction.transaction_hash AS "transactionHash"',
          'borrower_transaction.created_at AS "createdAt"',
          'bond.name AS "bondName"',
          'bond.bond_id AS "bondId"',
          'bond.loan_token AS "loanToken"',
          'tokenToken.symbol AS "loanTokenType"',
          'bond.collateral_token AS "collateralToken"',
          'loanToken.symbol AS "collateralTokenType"',
        ])

        .where(
          'LOWER(borrower_transaction.borrower_address) = LOWER(:borrowerAddress)',
          {
            borrowerAddress: user.walletAddress,
          },
        )
        .orderBy('borrower_transaction.created_at', 'DESC');
      if (params?.searchTransactionHash) {
        queryBuilder.where(
          'borrower_transaction.transaction_hash LIKE :transactionHash',
          { transactionHash: `%${params.searchTransactionHash}%` },
        );
      }
      const totalBorrowerTransaction = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedBorrowerTransaction = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<BorrowerTransactionItemResponseDto>(
        selectedBorrowerTransaction,
        totalBorrowerTransaction,
        { page, limit },
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async getManyTransactionsWithPageable(
    params: FindManyTransactionParamsDto,
    user: User,
  ): Promise<Pagination<TransactionItemResponseDto>> {
    try {
      const queryBuilder = this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect(Bond, 'bond', 'bond.bond_id = transaction.bond_id')
        .leftJoinAndSelect(
          Token,
          'loan_token',
          'bond.loan_token = loan_token.address',
        )
        .leftJoinAndSelect(
          'tokens',
          'collateral_token',
          'bond.collateral_token = collateral_token.address',
        )
        .select([
          'transaction.id AS "id"',
          'transaction.transaction_type AS "transactionType"',
          'transaction.user_wallet_address AS "userWalletAddress"',
          'transaction.amount AS "amount"',
          'transaction.status AS "status"',
          'transaction.transaction_hash AS "transactionHash"',
          'transaction.created_at AS "createdAt"',
          'bond.name AS "bondName"',
          'bond.bond_id AS "bondId"',
          'bond.loan_token AS "loanToken"',
          'loan_token.symbol AS "loanTokenType"',
          'bond.collateral_token AS "collateralToken"',
          'collateral_token.symbol AS "collateralTokenType"',
        ])

        .where(
          'LOWER(transaction.user_wallet_address) = LOWER(:userWalletAddress)',
          {
            userWalletAddress: user.walletAddress,
          },
        )
        .orderBy('transaction.created_at', 'DESC');

      const assetCase = `
        CASE 
        WHEN transaction.transaction_type IN('${TransactionType.COLLATERAL_WITHDRAWAL}','${TransactionType.REFUND_COLLATERAL}', '${TransactionType.COLLATERAL_DEPOSITED}' ) THEN collateral_token.symbol
        ELSE loan_token.symbol
        END
        `;
      queryBuilder.addSelect(assetCase, 'masterAsset');

      if (params?.searchTransactionHash) {
        queryBuilder.where(
          'transaction.transaction_hash LIKE :transactionHash',
          { transactionHash: `%${params.searchTransactionHash}%` },
        );
      }

      if (params?.transactionTypes) {
        const transactionTypes = params.transactionTypes;
        queryBuilder.andWhere(
          'transaction.transaction_type IN (:...transactionTypes)',
          {
            transactionTypes,
          },
        );
      }
      if (params?.assets) {
        const assets = params?.assets;
        queryBuilder.andWhere(`${assetCase} IN (:...assets)`, {
          assets,
        });
      }
      const totalTransactions = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedTransactions = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<TransactionItemResponseDto>(
        selectedTransactions,
        totalTransactions,
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
