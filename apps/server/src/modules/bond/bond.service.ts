/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindManyActiveBondsParams } from './dto/findManyActiveBondParams.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import {
  Bond,
  BondCheckout,
  LenderTransaction,
  Token,
  User,
} from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';
import { FindManyRequestBondsParamsDto } from './dto/findManyRequestBondParams.dto';
import { RequestBondItemResponseDto } from './dto/requestBondItemResponse.dto';
import { BorrowBondRequestSummaryDto } from './dto/borrowBondRequestSummary.dto';
import { BondStatusEnum, HoldingBondStatus } from 'shared/enum';
import { FindManyHoldingBondParamsDto } from './dto/findManyHoldingBond.params.dto';
import { HoldingBondItemResponseDto } from './dto/holdingBondItemResponse.dto';
import { HoldingBondSummaryItemResponseDto } from './dto/holdingBondSummaryItemResponse.dto';

@Injectable()
export class BondService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
    @InjectRepository(BondCheckout)
    private bondCheckoutRepository: Repository<BondCheckout>,
    @InjectRepository(LenderTransaction)
    private lenderTransactionRepository: Repository<LenderTransaction>,
  ) {}
  async findActiveBondsWithPageable(
    params: FindManyActiveBondsParams,
  ): Promise<Pagination<ActiveBondItemResponseDto>> {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const queryBuilder = this.bondRepository
        .createQueryBuilder('bonds') // use 'bonds' as the alias
        .leftJoinAndSelect(
          'tokens',
          'loanToken',
          'bonds.loanToken = loanToken.address',
        )
        .leftJoinAndSelect(
          'tokens',
          'collateralToken',
          'bonds.collateralToken = collateralToken.address',
        )
        .select([
          'bonds.name AS "bondName"',
          'bonds.loanTerm AS "loanTerm"',
          'bonds.loanAmount AS "loanAmount"',
          'bonds.loanToken AS "loanToken"',
          'bonds.collateralAmount AS "collateralAmount"',
          'bonds.collateralToken AS "collateralToken"',
          'bonds.lenderInterestRate AS "interestRate"',
          'bonds.volumeBond AS "volumeBond"',
          'bonds.issuanceDate AS "issuanceDate"',
          'bonds.maturityDate AS "maturityDate"',
          'bonds.borrowerAddress AS "borrowerAddress"',
          'bonds.bond_id AS "bondId"',
          'bonds.createdAt AS "createdAt"',
          'bonds.updatedAt AS "updatedAt"',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
          'bonds.totalSold AS "totalSold"',
        ])
        .where('bonds.issuanceDate >=:currentTimestamp', {
          currentTimestamp,
        })
        .orderBy('bonds.createdAt', 'DESC');

      if (params?.loanTerms) {
        const loanTerms = params.loanTerms;
        queryBuilder.andWhere('bonds.loanTerm IN (:...loanTerms)', {
          loanTerms,
        });
      }
      if (params?.borrows) {
        const borrows = params.borrows;
        queryBuilder.andWhere('bonds.loanToken IN (:...borrows)', {
          borrows,
        });
      }
      if (params.collaterals) {
        const collaterals = params.collaterals;
        queryBuilder.andWhere('bonds.collateralToken IN (:...collaterals)', {
          collaterals,
        });
      }

      const totalBondsActive = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedActiveBonds = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<ActiveBondItemResponseDto>(
        selectedActiveBonds,
        totalBondsActive,
        { page, limit },
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getActiveBondById(id: number): Promise<ActiveBondItemResponseDto> {
    try {
      const activeBond = await this.bondRepository
        .createQueryBuilder('bond')
        .leftJoinAndSelect(
          'tokens',
          'loanToken',
          'bond.loanToken = loanToken.address',
        )
        .leftJoinAndSelect(
          'tokens',
          'collateralToken',
          'bond.collateralToken = collateralToken.address',
        )
        .select([
          'bond.name AS "bondName"',
          'bond.loanTerm AS "loanTerm"',
          'bond.loanAmount AS "loanAmount"',
          'bond.loanToken AS "loanToken"',
          'bond.collateralAmount AS "collateralAmount"',
          'bond.collateralToken AS "collateralToken"',
          'bond.lenderInterestRate AS "interestRate"',
          'bond.volumeBond AS "volumeBond"',
          'bond.issuanceDate AS "issuanceDate"',
          'bond.maturityDate AS "maturityDate"',
          'bond.borrowerAddress AS "borrowerAddress"',
          'bond.bond_id AS "bondId"',
          'bond.createdAt AS "createdAt"',
          'bond.updatedAt AS "updatedAt"',
          'bond.totalSold AS "totalSold"',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
        ])
        .where('bond.bond_id = :id', { id })
        .getRawOne();

      return {
        ...activeBond,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getManyRequestBonds(
    user: User,
    params: FindManyRequestBondsParamsDto,
  ): Promise<Pagination<RequestBondItemResponseDto>> {
    try {
      // const walletAddressUpperCase = toUpperCaseHex(user.walletAddress);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const gracePeriodInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds

      const queryBuilder = this.bondRepository
        .createQueryBuilder('bonds')
        .leftJoinAndSelect(
          'tokens',
          'loanToken',
          'bonds.loanToken = loanToken.address',
        )
        .leftJoinAndSelect(
          'tokens',
          'collateralToken',
          'bonds.collateralToken = collateralToken.address',
        )
        .select([
          'bonds.name as name',
          'bonds.loanTerm as loanTerm',
          'bonds.loanAmount as loanAmount',
          'bonds.loanToken as loanToken',
          'bonds.collateralAmount as collateralAmount',
          'bonds.collateralToken as collateralToken',
          'bonds.volumeBond as volumeBond',
          'bonds.lenderInterestRate as interestRate',
          'bonds.issuanceDate as issuanceDate',
          'bonds.maturityDate as maturityDate',
          'bonds.borrowerAddress as borrowerAddress',
          'bonds.createdAt as createdAt',
          'bonds.updatedAt as updatedAt',
          'bonds.totalSold as totalSold',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
          `'${params.status}' as status`,
          'bonds.canceledAt as "canceledAt"',
          'bonds.repaidAt as "repaidAt"',
          'bonds.claimedLoanAt AS "claimedLoanAt"',
          'bonds.liquidatedAt AS "liquidatedAt"',
          'bonds.gracePeriodEndsAt AS "gracePeriodEndsAt"',
        ])
        .where('LOWER(bonds.borrowerAddress) = LOWER(:walletAddress)', {
          walletAddress: user.walletAddress,
        })
        .orderBy('bonds.createdAt', 'DESC');

      if (params?.bondDuration) {
        const loanTerms = params.bondDuration;
        queryBuilder.andWhere('bonds.loanTerm IN (:...loanTerms)', {
          loanTerms,
        });
      }

      if (params?.issuanceStartDate && params?.issuanceEndDate) {
        queryBuilder.andWhere(
          'bonds.issuance_date BETWEEN :issuanceStartDate AND :issuanceEndDate',
          {
            issuanceStartDate: Math.floor(
              new Date(params.issuanceStartDate).getTime() / 1000,
            ),
            issuanceEndDate: Math.floor(
              new Date(params.issuanceEndDate).getTime() / 1000 + 86400,
            ),
          },
        );
      }

      if (params?.maturityStartDate && params?.maturityeEndDate) {
        queryBuilder.andWhere(
          'bonds.maturity_date BETWEEN :maturityStartDate AND :maturityeEndDate',
          {
            maturityStartDate: Math.floor(
              new Date(params.maturityStartDate).getTime() / 1000,
            ),
            maturityeEndDate: Math.floor(
              new Date(params.maturityeEndDate).getTime() / 1000 + 86400,
            ),
          },
        );
      }
      if (params?.name) {
        queryBuilder.andWhere('bonds.name LIKE :name', {
          name: `%${params.name}%`,
        });
      }

      const statusConditions: any = {
        [BondStatusEnum.PENDING_ISSUANCE]:
          'bonds.issuanceDate > :currentTimestamp',
        [BondStatusEnum.ACTIVE]:
          'bonds.issuanceDate <= :currentTimestamp AND bonds.maturityDate > :currentTimestamp',
        [BondStatusEnum.GRACE_PERIOD]:
          'bonds.repaidAt IS NULL AND bonds.maturityDate <= :currentTimestamp AND bonds.maturityDate + :gracePeriodInSeconds >= :currentTimestamp',
        [BondStatusEnum.REPAID]: 'bonds.repaidAt IS NOT NULL',
        [BondStatusEnum.AUTOMATED_LIQUIDATION]:
          'bonds.liquidatedAt IS NOT NULL',
      };

      const statusCondition = statusConditions[params.status];
      queryBuilder.andWhere(statusCondition, {
        currentTimestamp,
        status: params.status,
        gracePeriodInSeconds,
      });

      const totalRequestBonds = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedRequestBonds = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<RequestBondItemResponseDto>(
        selectedRequestBonds,
        totalRequestBonds,
        { page, limit },
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getBorrowBondRequestSummary(
    user: User,
  ): Promise<BorrowBondRequestSummaryDto> {
    try {
      const queryBuilder = this.bondRepository
        .createQueryBuilder('bonds')
        .select([
          'SUM(bonds.loan_amount::numeric) AS "totalLoanAmount"',
          'SUM(bonds.collateral_amount::numeric) AS "totalDepositedCollateral"',
          'CAST(SUM(bonds.volumeBond) AS BIGINT) AS "totalBondsIssued"',
          'CAST(SUM(bonds.totalSold) AS BIGINT) AS "totalBondsSold"',
        ])
        .where('LOWER(bonds.borrower_address) = LOWER(:walletAddress)', {
          walletAddress: user?.walletAddress,
        });
      const result = await queryBuilder.getRawOne();
      return new BorrowBondRequestSummaryDto(
        Number(result.totalLoanAmount),
        1000,
        Number(result.totalDepositedCollateral),
        10,
        Number(result.totalBondsSold),
        Number(result.totalBondsIssued),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getHoldingBondsWithPageble(
    params: FindManyHoldingBondParamsDto,
    user: User,
  ): Promise<Pagination<HoldingBondItemResponseDto>> {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const queryBuilder = this.bondCheckoutRepository
        .createQueryBuilder('bond_checkout')
        .leftJoinAndSelect(
          Bond,
          'bonds',
          'bond_checkout.bond_id = bonds.bond_id',
        )
        .leftJoinAndSelect(
          User,
          'users',
          'LOWER(bond_checkout.lender_address) = LOWER(users.wallet_address)',
        )
        .select([
          'bond_checkout.bond_amount AS "bondAmount"',
          'bond_checkout.purchased_amount AS "purchasedAmount"',
          'bond_checkout.purchase_date AS "purchaseDate"',
          'bond_checkout.claimed_at AS "claimedAt"',
          'users.wallet_address AS "lenderWalletAddress"',
          'bond_checkout.id AS "id"',
          'users.account_id AS "lenderAccountId"',
        ])
        .addSelect(
          `JSON_BUILD_OBJECT(
          'name', bonds.name,
          'maturityDate', bonds.maturity_date,
          'loanToken', bonds.loan_token,
          'bondId', bonds.bond_id,
          'interestRate', bonds.lender_interest_rate,
          'loanTerm', bonds.loan_term,
          'issuanceDate', bonds.issuance_date,
          'maturityDate', bonds.maturity_date,
          'status', CASE 
              WHEN bonds.issuanceDate >${currentTimestamp} THEN '${BondStatusEnum.PENDING_ISSUANCE}'
              WHEN bonds.issuanceDate <=${currentTimestamp} AND bonds.maturityDate >${currentTimestamp} THEN '${BondStatusEnum.ACTIVE}'
            END
        ) AS "bondInfo"`,
        )

        .addSelect(
          `
        CASE 
          WHEN bonds.repaid_at IS NOT NULL OR bond_checkout.claimed_at IS NOT NULL OR bonds.liquidated_at IS NOT NULL THEN '${HoldingBondStatus.ENABLE_CLAIM}'
          ELSE '${HoldingBondStatus.DISABLE_CLAIM}'
        END as "status"`,
        )
        .where('LOWER(users.wallet_address) = LOWER(:walletAddress)', {
          walletAddress: user.walletAddress,
        })
        .orderBy('bond_checkout.created_at', 'DESC');

      if (params?.name) {
        queryBuilder.andWhere('bonds.name ILIKE :name', {
          name: `%${params.name}%`,
        });
      }
      const totalHoldingBonds = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedHoldingBonds = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<HoldingBondItemResponseDto>(
        selectedHoldingBonds,
        totalHoldingBonds,
        { page, limit },
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getHoldingBondSummary(
    user: User,
  ): Promise<HoldingBondSummaryItemResponseDto> {
    const bondCheckoutQueryBuilder = this.bondCheckoutRepository
      .createQueryBuilder('bond_checkout')
      .select([
        'SUM(bond_checkout.purchased_amount) AS "totalAmountBondPurchased"',
        'SUM(bond_checkout.bond_amount) AS "totalBondPurchased"',
      ])
      .where('LOWER(bond_checkout.lender_address) = LOWER(:walletAddress)', {
        walletAddress: user.walletAddress,
      });

    const bondCheckout = await bondCheckoutQueryBuilder.getRawOne();

    const lenderTransactionQueryBuilder = this.lenderTransactionRepository
      .createQueryBuilder('lender_transaction')
      .select([
        'SUM(lender_transaction.received_amount) AS "totalCapitalAndInterestRecieved"',
      ])
      .where(
        'LOWER(lender_transaction.lenderAddress) = LOWER(:walletAddress)',
        {
          walletAddress: user.walletAddress,
        },
      );
    const lenderTransaction = await lenderTransactionQueryBuilder.getRawOne();
    return new HoldingBondSummaryItemResponseDto(
      lenderTransaction.totalCapitalAndInterestRecieved,
      bondCheckout.totalAmountBondPurchased,
      Number(bondCheckout.totalBondPurchased),
    );
  }
}
