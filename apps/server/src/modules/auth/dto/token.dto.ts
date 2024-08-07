// import { NumberField, StringField } from '../../../decorators';

import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    type: String,
    description: 'access token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'refresh token',
  })
  refreshToken: string;

  constructor(data: { accessToken: string; refreshToken: string }) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
