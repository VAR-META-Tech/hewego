import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindManyActiveBondsParams } from './dto/FindManyActiveBondParams.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bond, BondCheckout, User } from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';
import { FindManyRequestBondsParamsDto } from './dto/findManyRequestBondParams.dto';
import { RequestBondItemResponseDto } from './dto/requestBondItemResponse.dto';

@Injectable()
export class BondService {
  constructor(
    @InjectRepository(Bond)
    private bondRepository: Repository<Bond>,
  ) {}
  async findActiveBondsWihPageable(
    params: FindManyActiveBondsParams,
  ): Promise<Pagination<ActiveBondItemResponseDto>> {
    try {
      const queryBuilder = this.bondRepository
        .createQueryBuilder('bonds') // use 'bonds' as the alias
        .select([
          'bonds.id AS "id"', // update to 'bonds'
          'bonds.name AS "bondName"',
          'bonds.loanTerm AS "loanTerm"',
          'bonds.loanAmount AS "loanAmount"',
          'bonds.loanToken AS "loanToken"',
          'bonds.borrowerInterestRate AS "interestRate"',
          'bonds.collateralToken AS "collateralToken"',
          'bonds.volumeBond AS "volumeBond"',
          'bonds.issuanceDate AS "issuanceDate"',
          'bonds.maturityDate AS "maturityDate"',
          'bonds.borrowerAddress AS "borrowerAddress"',
          'bonds.bond_id AS "bondId"',
          'bonds.createdAt AS "createdAt"',
          'bonds.updatedAt AS "updatedAt"',
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

        queryBuilder.andWhere('bonds.borrowerAddress IN (:...borrows)', {
          borrows,
        });
      }
      if (params.collaterals) {
        const collaterals = params.collaterals;
        queryBuilder.andWhere('bonds.collateralToken IN (:...collaterals)', {
          collaterals,
        });
      }
      const totalbondsActive = await queryBuilder.getCount();

      const limit = Number(params?.limit || 10);
      const page = Number(params?.page || 1);
      const offset = getOffset({ page, limit });
      queryBuilder.limit(limit).offset(offset);

      const selectedActiveBonds = await queryBuilder.execute();

      return getArrayPaginationBuildTotal<ActiveBondItemResponseDto>(
        selectedActiveBonds,
        totalbondsActive,
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
        .createQueryBuilder()
        .select([
          'bond.id AS "id"',
          'bond.name AS "bondName"',
          'bond.loanTerm AS "loanTerm"',
          'bond.loanAmount AS "loanAmount"',
          'bond.loanToken AS "loanToken"',
          'bond.borrowerInterestRate AS "interestRate"',
          'bond.collateralToken AS "collateralToken"',
          'bond.volumeBond AS "volumeBond"',
          'bond.issuanceDate AS "issuanceDate"',
          'bond.maturityDate AS "maturityDate"',
          'bond.borrowerAddress AS "borrowerAddress"',
          'bond.bond_id AS "bondId"',
          'bond.createdAt AS "createdAt"',
          'bond.updatedAt AS "updatedAt"',
          'CAST(COUNT(bondCheckout.bond_id) AS INT) AS "totalSales"',
        ])
        .leftJoin(
          BondCheckout,
          'bondCheckout',
          'bondCheckout.bond_id = bond.bond_id',
        )
        .where('bond.id = :id', { id })
        .groupBy('bond.id')
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
        .select([
          'bonds.id as id',
          'bonds.name as name',
          'bonds.loanTerm as loanTerm',
          'bonds.loanAmount as loanAmount',
          'bonds.loanToken as loanToken',
          'bonds.collateralAmount as collateralAmount',
          'bonds.collateralToken as collateralToken',
          'bonds.volumeBond as volumeBond',
          'bonds.borrowerInterestRate as interestRate',
          'bonds.issuanceDate as issuanceDate',
          'bonds.maturityDate as maturityDate',
          'bonds.borrowerAddress as borrowerAddress',
          'bonds.createdAt as createdAt',
          'bonds.updatedAt as updatedAt',
          'bonds.status as status',
        ])
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
}
