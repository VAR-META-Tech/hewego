import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TokenType } from '../../constants/token-type';
import { ApiConfigService } from 'shared/services/api-config.service';
import { UserService } from 'modules/user/user.service';
import { LoginWalletDto } from './dto/loginWallet.dto';
import { UserLoginWalletDto } from './dto/userLoginWallet.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadType } from './type/tokenPayload.type';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ApiConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async loginByWallet(payload: UserLoginWalletDto) {
    try {
      let user = await this.userService.getUserByWallet(payload.accountId);

      if (!user) {
        user = await this.userService.createNewUser({
          walletAddress: payload.wallet,
          accountId: payload.accountId,
        });
      }
      const tokens = await this.signTokens(user.id);

      return new LoginWalletDto({
        user,
        tokens,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async signTokens(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.newAccessToken(userId);
    const refreshToken = await this.newRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  /**
   * New access token
   * @param userId
   */
  async newAccessToken(userId: number): Promise<string> {
    try {
      const accessTokenExp =
        this.configService.authConfig.jwtAccessTokenExpirationTime;
      const accessTokenPayload: TokenPayloadType = {
        sub: {
          userId,
          type: TokenType.ACCESS_TOKEN,
        },
      };
      return await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: accessTokenExp,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  /**
   * New refresh token
   * @param userId
   * @param sessionId
   */
  async newRefreshToken(userId: number): Promise<string> {
    try {
      const refreshTokenTime =
        this.configService.authConfig.jwtRefreshTokenExpirationTime;
      const refreshTokenPayload: TokenPayloadType = {
        sub: {
          userId,
          type: TokenType.REFRESH_TOKEN,
        },
      };
      return await this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: refreshTokenTime,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
