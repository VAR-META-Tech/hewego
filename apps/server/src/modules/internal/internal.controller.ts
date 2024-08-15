import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BondService } from 'modules/bond/bond.service';
import { BondResponseDto } from './dto/bondResponse.dto';

@Controller('internal')
@ApiTags('internal')
export class InternalController {
  constructor(private readonly bondService: BondService) {}

  @Get('/bonds')
  @ApiOperation({
    summary: 'API TO INTEGRATE INTO INDEXER ',
  })
  @ApiResponse({
    status: 200,
    type: BondResponseDto,
  })
  async getBonds() {
    return await this.bondService.getManyBonds();
  }
}
