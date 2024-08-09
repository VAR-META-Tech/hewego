import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';

export class TokenItemResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: TokenItemResponseDto,
  })
  data: TokenItemResponseDto;
}
