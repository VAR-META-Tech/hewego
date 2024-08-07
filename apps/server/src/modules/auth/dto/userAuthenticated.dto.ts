import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';
import { UserDto } from 'modules/user/dto/user.dto';

export class UserAuthenticatedDto extends BaseResponse {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;
}
