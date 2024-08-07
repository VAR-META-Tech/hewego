import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';

export class GetNonceDto extends BaseResponse {
  @ApiProperty({
    type: Number,
    example: -1,
  })
  data: number;
}
