import { BaseResponse } from 'common/dto/baseResponse.dto';
import { FeePlatformItemResponseDto } from './dto/feePlatformItemResponse.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class FeePlatformResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: FeePlatformItemResponseDto,
  })
  data: FeePlatformItemResponseDto;
}
