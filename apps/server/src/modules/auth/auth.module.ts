import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSession } from '../..//database/entities';
import { SessionModule } from '../session/session.module';
import { AuthService } from './auth.service';
import { MyJwtService } from './jwt.service';
import { WalletService } from './wallet.service';
import { UserJwtStrategy } from './strategies/userJwt.strategy';
import { UserJwtRefreshTokenStrategy } from './strategies/userRefreshToken.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSession]),
    JwtModule.register({}),
    SessionModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    MyJwtService,
    WalletService,
    UserJwtStrategy,
    UserJwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [MyJwtService, AuthService],
})
export class AuthModule {}
