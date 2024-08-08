import { Controller, Get, Param, Query } from '@nestjs/common';
import { BondService } from './bond.service';
import { FindManyActiveBondsParams } from './dto/FindManyActiveBondParams.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveBondResponseDto } from './dto/activeBondResponse.dto';
import { ActiveBondItemResponseDto } from './dto/activeBondItemResponse.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('bonds')
@ApiTags('bonds')
export class BondController {
  constructor(private readonly bondService: BondService) {}
  @Get('/active')
  @ApiResponse({
    status: 200,
    type: ActiveBondResponseDto,
  })
  async getActiveBonds(
    @Query() queries: FindManyActiveBondsParams,
  ): Promise<Pagination<ActiveBondItemResponseDto>> {
    return await this.bondService.findActiveBondsWihPageable(queries);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: ActiveBondItemResponseDto })
  async getActiveBondById(
    @Param('id') id: string,
  ): Promise<ActiveBondItemResponseDto> {
    console.log({ id });
    return await this.bondService.getActiveBondById(+id);
  }
}
