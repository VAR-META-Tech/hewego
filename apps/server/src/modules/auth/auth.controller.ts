import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { WalletValidateDto } from './dto/wallet.validate';
import { WalletService } from './wallet.service';
import { UserJwtRefreshTokenGuard } from './guards/userRefreshToken.guard';
import { UserDecorator } from '../../decorators/user.decorator';
import { JwtPayloadType, TokensType } from '../../shared/types';

@ApiTags('auth')
@Controller('api/user/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
  ) {}

  @Post('login-with-wallet')
  async loginAsUserWithGoogle(@Body() dto: WalletValidateDto) {
    return await this.authService.loginByWallet(dto);
  }

  @Get('nonce')
  async getNonce(@Query('wallet') wallet: string) {
    return await this.walletService.getNonce(wallet);
  }

  @ApiBearerAuth()
  @Get('logout')
  @UseGuards(UserJwtRefreshTokenGuard)
  async logoutAsUser(
    @UserDecorator('session') session: string,
  ): Promise<boolean> {
    return await this.authService.logoutAsUser(session);
  }

  @ApiBearerAuth()
  @Get('refresh-token')
  @UseGuards(UserJwtRefreshTokenGuard)
  async refreshTokenAsUser(
    @UserDecorator() user: JwtPayloadType,
  ): Promise<TokensType> {
    return await this.authService.refreshTokenAsUser(user);
  }
}
