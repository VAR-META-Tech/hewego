import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindManyActiveBondsParams } from './dto/FindManyAcademyParams.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bond } from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getArrayPaginationBuildTotal, getOffset } from 'utils/pagination';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';

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
          'bonds.interestRate as interestRate',
          'bonds.issuanceDate as issuanceDate',
          'bonds.maturityDate as maturityDate',
          'bonds.borrowerAddress as borrowerAddress',
          'bonds.createdAt as createdAt',
          'bonds.updatedAt as updatedAt',
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
      const activeBond = await this.bondRepository.findOne({
        where: { id },
      });
      return {
        ...activeBond,
        totalSales: 10,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
