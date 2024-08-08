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
      // const currentDateInSeconds = Math.floor(Date.now() / 1000);
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
        // .where('bonds.maturityDate < :currentDate', {
        //   currentDate: currentDateInSeconds,
        // })
        .orderBy('bonds.createdAt', 'DESC');

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
}
