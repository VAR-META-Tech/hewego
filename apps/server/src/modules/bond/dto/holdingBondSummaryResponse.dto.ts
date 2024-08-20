import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';
import { HoldingBondSummaryItemResponseDto } from './holdingBondSummaryItemResponse.dto';

export class HoldingBondSummaryResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: HoldingBondSummaryItemResponseDto,
  })
  data: HoldingBondSummaryItemResponseDto;
}
