import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';
import { PriceFeedItemResponseDto } from './priceFeedItemResponse.dto';

export class PriceFeedResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: PriceFeedItemResponseDto,
  })
  data: PriceFeedResponseDto;
}
