import { Module } from '@nestjs/common';
import { BondService } from './bond.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bond } from 'database/entities/Bond.entity';
import { BondController } from './bond.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bond])],
  providers: [BondService],
  controllers: [BondController],
  exports: [BondService],
})
export class BondModule {}
