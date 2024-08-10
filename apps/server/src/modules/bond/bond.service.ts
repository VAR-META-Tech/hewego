/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindManyActiveBondsParams } from './dto/FindManyActiveBondParams.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bond, BondCheckout, Token, User } from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';
import { FindManyRequestBondsParamsDto } from './dto/findManyRequestBondParams.dto';
import { RequestBondItemResponseDto } from './dto/requestBondItemResponse.dto';
import { BorrowBondRequestSummaryDto } from './dto/borrowBondRequestSummary.dto';
import { BondStatusEnum } from 'shared/enum';

@Injectable()
export class BondService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
  ) {}
  async findActiveBondsWithPageable(
    params: FindManyActiveBondsParams,
  ): Promise<Pagination<ActiveBondItemResponseDto>> {
    try {
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
        ])
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
          'bond.totalSold AS "totalSales"',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
        ])
        // .leftJoin(
        //   BondCheckout,
        //   'bondCheckout',
        //   'bondCheckout.bond_id = bond.bond_id',
        // )
        .where('bond.bond_id = :id', { id })
        // .groupBy('bond.bond_id')
        // .addGroupBy('bond.contract_address')
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
          'bonds.status as status',
          'bonds.totalSold as totalSales',
          'loanToken.symbol AS "loanTokenType"',
          'collateralToken.symbol AS "collateralTokenType"',
          //   'status', CASE
          //   WHEN gameInfo.startTime > ${currentTime} AND gameInfo.endTime > ${currentTime}
          //   THEN '${GameInfoAction.UP_COMING}'
          //   WHEN gameInfo.startTime < ${currentTime} AND gameInfo.endTime > ${currentTime}
          //   THEN '${GameInfoAction.ON_GOING}'
          //   ELSE '${GameInfoAction.CLOSED}'
          // END'
        ])
        // .addSelect(
        //   `CASE
        //   WHEN bonds.issuanceDate > ${Date.now()} AND bonds.maturityDate > ${Date.now()} THEN '${BondStatusEnum.PENDING_ISSUANCE}'
        //   END`,
        //   'status',
        // )
        .where({
          borrowerAddress: user?.walletAddress,
        })

        .orderBy('bonds.createdAt', 'DESC');

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
    return new BorrowBondRequestSummaryDto(
      1000000,
      800000,
      1500000,
      500000,
      2000,
      3000,
    );
  }
}
