import { BaseResponse } from 'common/dto/baseResponse.dto';
import { BorrowBondRequestSummaryDto } from './borrowBondRequestSummary.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BorrowBondRequestSummaryResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: BorrowBondRequestSummaryDto,
  })
  data: BorrowBondRequestSummaryDto;
}
