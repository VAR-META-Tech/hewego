import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PriceFeedService } from './price-feed.service';
import { PriceFeedParamsDto } from './dto/latestTokenPriceParams.dto';
import { PriceFeedResponseDto } from './dto/priceFeedItemResponse.dto';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';

@Controller('price-feed')
@ApiTags('price-feed')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class PriceFeedController {
  constructor(private readonly priceFeedService: PriceFeedService) {}
  @Get('')
  async getLatestPrice(
    @Query() queries: PriceFeedParamsDto,
  ): Promise<PriceFeedResponseDto> {
    return await this.priceFeedService.getLatestPriceFeed(queries);
  }
}
