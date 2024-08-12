import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';

export class PriceFeedResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: PriceFeedResponseDto,
  })
  data: PriceFeedResponseDto;
}
