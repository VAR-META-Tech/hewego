import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PriceFeedService } from './price-feed.service';

@Controller('price-feed')
@ApiTags('price-feed')
export class PriceFeedController {
  constructor(private readonly priceFeedService: PriceFeedService) {}
  @Get('')
  async getLatestPrice() {
    const tokenA = '0x0000000000000000000000000000000000474Df2';
    const tokenB = '0x0000000000000000000000000000000000474df3';
    const result = await this.priceFeedService.getLatestPrice(tokenA, tokenB);
    return result;
  }
}
