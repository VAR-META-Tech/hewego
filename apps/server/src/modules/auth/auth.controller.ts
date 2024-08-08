import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDecorator } from '../../decorators/user.decorator';
import { UserLoginWalletDto } from './dto/userLoginWallet.dto';
import { JWTAuthGuard } from './guards/userJwt.guard';
import { User } from 'database/entities';
import { LoginWalletDto } from './dto/loginWallet.dto';
import { LoginWalletResponseDto } from './dto/loginWalletResponse.dto';
import { UserAuthenticatedDto } from './dto/userAuthenticated.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get('me')
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    status: 200,
    type: UserAuthenticatedDto,
  })
  @ApiBearerAuth()
  async me(@UserDecorator() user: User) {
    return user;
  }
}
