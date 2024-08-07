import { ApiProperty } from '@nestjs/swagger';
import { User } from 'database/entities';
import { UserDto } from 'modules/user/dto/user.dto';
import { TokenDto } from './token.dto';

export class LoginWalletDto {
  @ApiProperty({
    type: UserDto,
  })
  user: User;

  @ApiProperty({
    type: TokenDto,
  })
  tokens: TokenDto;

  constructor(data: { user: User; tokens: TokenDto }) {
    this.user = data.user;
    this.tokens = data.tokens;
  }
}
