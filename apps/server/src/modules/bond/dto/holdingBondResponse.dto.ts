import { BaseResponse } from 'common/dto/baseResponse.dto';
import { HoldingBondItemResponseDto } from './holdingBondItemResponse.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class HoldingBondResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: [HoldingBondItemResponseDto],
  })
  data: Array<HoldingBondItemResponseDto>;
}
