import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities';
import { AuthService } from './auth.service';
import { UserJwtStrategy } from './strategies/userJwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ApiConfigService } from 'shared/services/api-config.service';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.authConfig.privateKey,
        signOptions: {
          algorithm: 'HS256',
        },
      }),
      inject: [ApiConfigService],
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, UserJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
