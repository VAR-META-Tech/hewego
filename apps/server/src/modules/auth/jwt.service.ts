import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserAuthConfig } from '../../config/userAuth.config';
import { TokensType } from '../../shared/types';

enum JwtAuthRole {
  USER_AUTH = 'userAuth',
  ADMIN_AUTH = 'adminAuth',
}

@Injectable()
export class MyJwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private async signTokens(
    payload: { session: string },
    role: JwtAuthRole,
  ): Promise<TokensType> {
    const authConfig = this.configService.get<UserAuthConfig>(role);

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: authConfig.accessTokenLifetime,
      secret: authConfig.accessTokenSecret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: authConfig.refreshTokenLifetime,
      secret: authConfig.refreshTokenSecret,
    });

    const expiresAt =
      Math.floor(Date.now()) + authConfig.accessTokenLifetime * 1000; // in milliseconds

    return { accessToken, refreshToken, expiresAt };
  }

  async signUserTokens(payload: {
    session: string;
    userId: number;
  }): Promise<TokensType> {
    return this.signTokens(payload, JwtAuthRole.USER_AUTH);
  }

  async signAdminTokens(payload: { session: string }): Promise<TokensType> {
    return this.signTokens(payload, JwtAuthRole.ADMIN_AUTH);
  }
}
