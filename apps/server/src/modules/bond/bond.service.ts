import {
  BadRequestException,
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
  Transaction,
  User,
} from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';
import { FindManyRequestBondsParamsDto } from './dto/findManyRequestBondParams.dto';
import { RequestBondItemResponseDto } from './dto/requestBondItemResponse.dto';
import { BorrowBondRequestSummaryDto } from './dto/borrowBondRequestSummary.dto';
import {
  BondStatusEnum,
  HoldingBondStatus,
  RequestBondAction,
} from 'shared/enum';
import { FindManyHoldingBondParamsDto } from './dto/findManyHoldingBond.params.dto';
import { HoldingBondItemResponseDto } from './dto/holdingBondItemResponse.dto';
import { HoldingBondSummaryItemResponseDto } from './dto/holdingBondSummaryItemResponse.dto';
import { ethers } from 'ethers';
import { ApiConfigService } from 'shared/services/api-config.service';
import { divideBy10e8 } from '../../utils';
@Injectable()
export class BondService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
    @InjectRepository(BondCheckout)
    private bondCheckoutRepository: Repository<BondCheckout>,
    @InjectRepository(LenderTransaction)
    private lenderTransactionRepository: Repository<LenderTransaction>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly configService: ApiConfigService,
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
        .andWhere('bonds.canceled_at IS NULL')
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
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // const gracePeriodInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds

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
          'bonds.name as "name"',
          'bonds.bond_id as "bondId"',
          'bonds.loanTerm as "loanTerm"',
          'bonds.loanAmount as "loanAmount"',
          'bonds.loanToken as "loanToken"',
          'bonds.collateralAmount as "collateralAmount"',
          'bonds.collateralToken as "collateralToken"',
          'bonds.volumeBond as "volumeBond"',
          'bonds.lenderInterestRate as "interestRate"',
          'bonds.issuanceDate as "issuanceDate"',
          'bonds.maturityDate as "maturityDate"',
          'bonds.borrowerAddress as "borrowerAddress"',
          'bonds.createdAt as "createdAt"',
          'bonds.updatedAt as "updatedAt"',
          'bonds.totalSold as "totalSold"',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
          // `'${params.status}' as status`,
          'bonds.canceledAt as "canceledAt"',
          'bonds.repaidAt as "repaidAt"',
          'bonds.claimedLoanAt AS "claimedLoanAt"',
          'bonds.liquidatedAt AS "liquidatedAt"',
          'bonds.gracePeriodEndsAt AS "gracePeriodEndsAt"',
        ])
        .where('LOWER(bonds.borrowerAddress) = LOWER(:walletAddress)', {
          walletAddress: user.walletAddress,
        });
      // .orderBy('bonds.createdAt', 'DESC');

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

      if (params?.maturityStartDate && params?.maturityEndDate) {
        queryBuilder.andWhere(
          'bonds.maturity_date BETWEEN :maturityStartDate AND :maturityEndDate',
          {
            maturityStartDate: Math.floor(
              new Date(params.maturityStartDate).getTime() / 1000,
            ),
            maturityEndDate: Math.floor(
              new Date(params.maturityEndDate).getTime() / 1000 + 86400,
            ),
          },
        );
      }
      if (params?.name) {
        queryBuilder.andWhere('bonds.name LIKE :name', {
          name: `%${params.name}%`,
        });
      }

      if (params?.status === BondStatusEnum.PENDING_ISSUANCE) {
        queryBuilder.andWhere('bonds.issuanceDate > :currentTimestamp', {
          currentTimestamp,
        });
        queryBuilder.andWhere('bonds.canceled_at IS NULL');
        const actionCase = `
          CASE 
            WHEN bonds.canceledAt IS NULL THEN '${RequestBondAction.TO_BE_CANCEL}'
            ELSE '${RequestBondAction.CLOSED}'
          END
          `;
        queryBuilder.addSelect(actionCase, 'action');
        queryBuilder.orderBy('bonds.issuance_date', 'DESC');
      }

      if (params?.status === BondStatusEnum.ACTIVE) {
        queryBuilder.andWhere('bonds.total_sold > :minTotalSold', {
          minTotalSold: 0,
        });
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where(
              'bonds.issuanceDate <= :currentTimestamp AND bonds.maturityDate > :currentTimestamp',
              {
                currentTimestamp,
              },
            );
          }),
        );
        const actionCase = `
          CASE
            WHEN bonds.repaidAt IS NULL THEN '${RequestBondAction.REPAY}'
            WHEN bonds.liquidatedAt IS NOT NULL THEN '${RequestBondAction.CLOSED}'
            ELSE '${RequestBondAction.CLOSED}'
          END
        `;

        queryBuilder.addSelect(actionCase, 'action');
        queryBuilder.orderBy('bonds.maturity_date', 'DESC');
      }

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

  /**
   * Get summary of borrow bond request
   * @param user
   */
  async getBorrowBondRequestSummary(
    user: User,
  ): Promise<BorrowBondRequestSummaryDto> {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const bondSummaryResult = await this.bondRepository
        .createQueryBuilder('bond')
        .select([
          'SUM(bond.loan_amount) AS "totalLoanAmount"',
          'SUM(bond.repaid_amount) AS "totalRepaymentAmount"',
          'SUM(bond.collateral_amount) AS "totalDepositedCollateral"',
          'SUM(bond.liquidated_amount) AS "totalLiquidatedAmount"',
          'SUM(bond.volumeBond) AS "totalBondsIssued"',
          'SUM(bond.totalSold) AS "totalBondsSold"',
        ])
        .where('LOWER(bond.borrower_address) = :walletAddress', {
          walletAddress: user?.walletAddress,
        })
        .andWhere('bond.canceled_at IS NULL')
        .getRawOne();
      const issueBondResult = await this.bondRepository
        .createQueryBuilder('bond')
        .select([
          'SUM(bond.loan_amount) AS "totalBondIssuedValue"',
          'SUM(bond.volumeBond) AS "totalBondsIssued"',
        ])
        .where('LOWER(bond.borrower_address) = :walletAddress', {
          walletAddress: user?.walletAddress,
        })
        .andWhere(
          'bond.issuanceDate <= :currentTimestamp AND bond.maturityDate > :currentTimestamp',
          {
            currentTimestamp,
          },
        )
        .getRawOne();

      const interestRates = await this.bondRepository
        .createQueryBuilder('bond')
        .select([
          'bond.lender_interest_rate AS "interestRate"',
          'bond.loan_term AS "loanTerm"',
          'bond.loan_amount AS "loanAmount"',
        ])
        .where('LOWER(bond.borrower_address) = :walletAddress', {
          walletAddress: user?.walletAddress,
        })
        .andWhere('bond.canceled_at IS NULL')
        .execute();

      const totalRepaymentInterestRate = interestRates.reduce(
        (
          total: number,
          item: {
            loanAmount: number;
            loanTerm: number;
            interestRate: number;
          },
        ) => {
          const currentLoanAmount = parseFloat(
            ethers.utils.formatUnits(ethers.BigNumber.from(item.loanAmount), 8),
          );
          const weekRate = item.loanTerm / 52;
          const totalInterest =
            (currentLoanAmount * item.interestRate * weekRate) / 100;
          return total + totalInterest;
        },
        0,
      );

      return new BorrowBondRequestSummaryDto(
        divideBy10e8(issueBondResult.totalBondsIssued),
        divideBy10e8(issueBondResult.totalBondIssuedValue),
        divideBy10e8(bondSummaryResult.totalDepositedCollateral),
        divideBy10e8(bondSummaryResult.totalLiquidatedAmount),
        totalRepaymentInterestRate,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Get holding bonds with pageable
   * @param params
   * @param user
   */
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
          'totalSold', bonds.total_sold,
          'volumeBond', bonds.volume_bond,
          'status', CASE 
              WHEN bonds.issuanceDate >${currentTimestamp} THEN '${BondStatusEnum.PENDING_ISSUANCE}'
              WHEN bonds.issuanceDate <=${currentTimestamp} AND bonds.maturityDate >${currentTimestamp} THEN '${BondStatusEnum.ACTIVE}'
            END
        ) AS "bondInfo"`,
        )

        .addSelect(
          `
        CASE 
          WHEN bonds.repaid_at IS NOT NULL THEN '${HoldingBondStatus.ENABLE_CLAIM}'
          ELSE '${HoldingBondStatus.DISABLE_CLAIM}'
        END as "status"`,
        )
        .where('LOWER(users.wallet_address) = LOWER(:walletAddress)', {
          walletAddress: user.walletAddress,
        })
        .andWhere('bond_checkout.claimed_at IS NULL')
        .orderBy('bonds.maturity_date', 'DESC');

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
      })
      .andWhere('bond_checkout.claimed_at IS NULL');

    const bondCheckout = await bondCheckoutQueryBuilder.getRawOne();

    const queryBuilder = this.bondCheckoutRepository
      .createQueryBuilder('bond_checkout')
      .leftJoin('bonds', 'bonds', 'bond_checkout.bond_id = bonds.bond_id')
      .select([
        'bond_checkout.purchased_amount AS "purchasedAmount"',
        'bonds.loan_term AS "loanTerm"',
        'bonds.lender_interest_rate AS "lenderInterestRate"',
      ])
      .where('LOWER(bond_checkout.lender_address) = LOWER(:walletAddress)', {
        walletAddress: user.walletAddress,
      })
      .andWhere('bond_checkout.claimed_at IS NULL');
    const lenderCheckout = await queryBuilder.execute();

    const totalReceivedAmountOfLender = lenderCheckout.reduce(
      (
        total: number,
        item: {
          purchasedAmount: string;
          loanTerm: number;
          lenderInterestRate: number;
        },
      ) => {
        const loanAmount = ethers.utils.formatUnits(
          ethers.BigNumber.from(item?.purchasedAmount),
          8,
        );
        const weekRate = Number(item?.loanTerm) / 52;
        const totalInterest = Number(
          ((Number(loanAmount) * Number(item?.lenderInterestRate)) / 100) *
            Number(weekRate),
        );
        const totalReceiveAmount = Number(loanAmount) + totalInterest;
        return total + totalReceiveAmount;
      },
      0,
    );
    const totalAmountBondPurchased = divideBy10e8(
      bondCheckout.totalAmountBondPurchased,
    );
    return new HoldingBondSummaryItemResponseDto(
      totalReceivedAmountOfLender - totalAmountBondPurchased,
      totalAmountBondPurchased,
      Number(bondCheckout.totalBondPurchased),
    );
  }

  async getManyBonds(): Promise<Partial<Bond[]>> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const activeBondIssuanceContractAddress =
      this.configService.getHederaConfig.bondIssuanceContractAddress;
    return await this.bondRepository
      .createQueryBuilder('bonds')
      .where('LOWER(bonds.contract_address) = LOWER(:contractAddress)', {
        contractAddress: activeBondIssuanceContractAddress,
      })
      .andWhere('bonds.repaid_at IS NULL')
      .andWhere(
        'bonds.issuanceDate <= :currentTimestamp AND bonds.maturityDate > :currentTimestamp',
        {
          currentTimestamp,
        },
      )
      .getMany();
  }
}
