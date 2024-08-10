import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenItemResponseDto } from './dto/tokenItemResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('meta/tokens')
@ApiTags('meta token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [TokenItemResponseDto],
  })
  async getAllTokens(): Promise<TokenItemResponseDto[]> {
    return this.tokenService.getAllTokens();
  }
}
