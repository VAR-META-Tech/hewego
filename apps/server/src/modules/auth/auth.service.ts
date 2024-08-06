import { Injectable } from '@nestjs/common';
import { WalletValidateDto } from './dto/wallet.validate';
import { WalletService } from './wallet.service';

import { User } from '../../database/entities/User.entity';
import type { JwtPayloadType, TokensType } from '../../shared/types';
import { SessionService } from '../session/session.service';
import { MyJwtService } from './jwt.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly walletService: WalletService,
    private readonly sessionService: SessionService,
    private readonly jwtService: MyJwtService,
  ) {}

  async loginByWallet(data: WalletValidateDto) {
    let userExist = await this.walletService.getUserByWallet(data.wallet);

    const nonce = userExist?.nonce >= 0 ? userExist.nonce : -1;
    await this.walletService.validateSignature(data, nonce);

    userExist = await this.walletService.loginByWallet(data, nonce, userExist);

    return await this.createUserSession(userExist);
  }

  private async createUserSession(
    user: User,
  ): Promise<{ user: User; tokens: TokensType }> {
    const tokens = await this.createTokensAsUser(user);

    return {
      user,
      tokens,
    };
  }

  /**
   * Create Token
   */
  async createTokensAsUser(user: User): Promise<TokensType> {
    const { id } = await this.sessionService.createUserSession({
      user,
    });

    const tokens = await this.jwtService.signUserTokens({
      session: id,
      userId: user.id,
    });

    return tokens;
  }

  /**
   * Refresh Token
   */
  async refreshTokenAsUser(payload: JwtPayloadType): Promise<TokensType> {
    const { session, userId } = payload;
    const { id } = await this.sessionService.createUserSession({
      id: session,
    });

    const tokens = await this.jwtService.signUserTokens({
      session: id,
      userId,
    });

    return tokens;
  }

  /**
   * Logout
   */
  async logoutAsUser(session: string): Promise<boolean> {
    return await this.sessionService.deleteUserSession({
      id: session,
    });
  }
}
