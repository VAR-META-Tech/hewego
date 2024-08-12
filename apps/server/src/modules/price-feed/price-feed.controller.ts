import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PriceFeedService } from './price-feed.service';
import { PriceFeedParamsDto } from './dto/latestTokenPriceParams.dto';
import { PriceFeedItemResponseDto } from './dto/priceFeedItemResponse.dto';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { PriceFeedResponseDto } from './dto/priceFeedResponse.dto';

@Controller('price-feed')
@ApiTags('price-feed')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class PriceFeedController {
  constructor(private readonly priceFeedService: PriceFeedService) {}
  @Get('')
  @ApiResponse({
    status: 200,
    type: PriceFeedResponseDto,
  })
  async getLatestPrice(
    @Query() queries: PriceFeedParamsDto,
  ): Promise<PriceFeedItemResponseDto> {
    return await this.priceFeedService.collateralAmountCalculation(queries);
  }
}
