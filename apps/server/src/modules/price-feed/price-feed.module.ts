import { Module } from '@nestjs/common';
import { PriceFeedController } from './price-feed.controller';
import { PriceFeedService } from './price-feed.service';
import { ContractModule } from 'modules/contract/contract.module';
import { TokenModule } from 'modules/token/token.module';
import { FeeController } from './fee.controller';

@Module({
  imports: [ContractModule, TokenModule],
  controllers: [PriceFeedController, FeeController],
  providers: [PriceFeedService],
})
export class PriceFeedModule {}
