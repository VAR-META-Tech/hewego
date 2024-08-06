import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionService } from './session.service';
import { UserSession } from 'database/entities/UserSession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
