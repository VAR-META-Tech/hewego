import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { WalletService } from './wallet.service';
import { UserDecorator } from '../../decorators/user.decorator';
import { UserLoginWalletDto } from './dto/userLoginWallet.dto';
import { UserJwtGuard } from './guards/userJwt.guard';
import { User } from 'database/entities';
import { LoginWalletDto } from './dto/loginWallet.dto';
import { LoginWalletResponseDto } from './dto/loginWalletResponse.dto';
import { GetNonceDto } from './dto/nonce.dto';
import { UserAuthenticatedDto } from './dto/userAuthenticated.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
  ) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    type: LoginWalletResponseDto,
  })
  async userLoginWithWallet(
    @Body() dto: UserLoginWalletDto,
  ): Promise<LoginWalletDto> {
    return await this.authService.loginByWallet(dto);
  }

  @Get('nonce')
  @ApiResponse({
    status: 200,
    type: GetNonceDto,
  })
  async getNonce(@Query('wallet') wallet: string): Promise<number> {
    return await this.walletService.getNonce(wallet);
  }

  @Get('me')
  @UseGuards(UserJwtGuard)
  @ApiResponse({
    status: 200,
    type: UserAuthenticatedDto,
  })
  @ApiBearerAuth()
  async me(@UserDecorator() user: User) {
    return user;
  }
}
