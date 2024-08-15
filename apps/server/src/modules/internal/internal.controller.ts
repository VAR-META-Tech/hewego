import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BondService } from 'modules/bond/bond.service';

@Controller('internal')
@ApiTags('internal')
export class InternalController {
  constructor(private readonly bondService: BondService) {}

  @Get('/bonds')
  @ApiOperation({
    summary: 'API TO INTEGRATE INTO INDEXER ',
  })
  async getBonds() {
    return await this.bondService.getManyBonds();
  }
}
