import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';
import { TokenItemResponseDto } from './tokenItemResponse.dto';

export class TokenResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: TokenItemResponseDto,
  })
  data: TokenItemResponseDto;
}
