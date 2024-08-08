import { Controller, Get, Query } from '@nestjs/common';
import { BondService } from './bond.service';
import { FindManyActiveBondsParams } from './dto/FindManyAcademyParams.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveBondResponseDto } from './dto/activeBondResponse.dto';

@Controller('bonds')
@ApiTags('bonds')
export class BondController {
  constructor(private readonly bondService: BondService) {}
  @Get('/active')
  @ApiResponse({
    status: 200,
    type: ActiveBondResponseDto,
  })
  async getActiveBonds(@Query() queries: FindManyActiveBondsParams) {
    return this.bondService.findActiveBondsWihPageable(queries);
  }
}
