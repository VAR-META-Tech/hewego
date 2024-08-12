import { Module } from '@nestjs/common';
import { PriceFeedController } from './price-feed.controller';
import { PriceFeedService } from './price-feed.service';
import { ContractModule } from 'modules/contract/contract.module';
import { TokenModule } from 'modules/token/token.module';

@Module({
  imports: [ContractModule, TokenModule],
  controllers: [PriceFeedController],
  providers: [PriceFeedService],
})
export class PriceFeedModule {}
