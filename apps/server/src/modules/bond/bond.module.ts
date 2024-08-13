import { Module } from '@nestjs/common';
import { BondService } from './bond.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from 'database/entities/Bond.entity';
import { BondController } from './bond.controller';
import { PortfolioController } from './portfolio.controller';
import { BondCheckout } from 'database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Bond, BondCheckout])],
  providers: [BondService],
  controllers: [BondController, PortfolioController],
  exports: [BondService],
})
export class BondModule {}
