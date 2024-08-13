import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BondService } from './bond.service';
import { RequestBondItemResponseDto } from './dto/requestBondItemResponse.dto';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindManyRequestBondsParamsDto } from './dto/findManyRequestBondParams.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'database/entities';
import { UserDecorator } from 'decorators/user.decorator';
import { BorrowBondRequestSummaryDto } from './dto/borrowBondRequestSummary.dto';
import { BorrowBondRequestSummaryResponseDto } from './dto/borrowBondRequestSummaryResponse.dto';
import { FindManyHoldingBondParamsDto } from './dto/findManyHoldingBond.params.dto';
import { HoldingBondResponseDto } from './dto/holdingBondResponse.dto';
import { HoldingBondItemResponseDto } from './dto/holdingBondItemResponse.dto';
@Controller('portfolio')
@ApiTags('portfolio')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class PortfolioController {
  constructor(private readonly bondService: BondService) {}
  @Get('/borrow-requests')
  @ApiResponse({
    status: 200,
    type: RequestBondItemResponseDto,
  })
  async getRequestBonds(
    @Query() queries: FindManyRequestBondsParamsDto,
    @UserDecorator() user: User,
  ): Promise<Pagination<RequestBondItemResponseDto>> {
    return await this.bondService.getManyRequestBonds(user, queries);
  }

  @Get('/borrow-requests/summary')
  @ApiResponse({
    status: 200,
    type: BorrowBondRequestSummaryResponseDto,
  })
  async getBorrowBondRequestSummary(
    @UserDecorator() user: User,
  ): Promise<BorrowBondRequestSummaryDto> {
    return await this.bondService.getBorrowBondRequestSummary(user);
  }

  @Get('/bond-holding')
  @ApiResponse({
    status: 200,
    type: HoldingBondResponseDto,
  })
  async getHoldingBonds(
    @Query() queries: FindManyHoldingBondParamsDto,
    @UserDecorator() user: User,
  ): Promise<Pagination<HoldingBondItemResponseDto>> {
    return await this.bondService.getHoldingBondsWithPageble(queries, user);
  }
}
