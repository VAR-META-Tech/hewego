import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller';
import { BondModule } from 'modules/bond/bond.module';

@Module({
  imports: [BondModule],
  controllers: [InternalController],
})
export class InternalModule {}
