import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { ContractService } from 'modules/contract/contract.service';
import { FeePlatformItemResponseDto } from './dto/feePlatformItemResponse.dto';
import { FeePlatformResponseDto } from './feePlatformResponse.dto';
@Controller('fee')
@ApiTags('fee-platform')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class FeeController {
  constructor(private readonly contractService: ContractService) {}
  @Get('')
  @ApiResponse({
    status: 200,
    type: FeePlatformResponseDto,
  })
  async getLatestPlatformFeeOnchain(): Promise<FeePlatformItemResponseDto> {
    const platformFee = await this.contractService.getPlatformFeePercent();
    return new FeePlatformItemResponseDto(platformFee);
  }
}
