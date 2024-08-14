import { PaginationResponseDto } from 'common/dto/paginationResponse.dto';

import { ApiResponseProperty } from '@nestjs/swagger';
import { BorrowerTransactionItemResponseDto } from './borrowerTransactionItemResponse.dto';

export class BorrowerTransactionResponseDto extends PaginationResponseDto {
  @ApiResponseProperty({
    type: [BorrowerTransactionItemResponseDto],
  })
  data: Array<BorrowerTransactionItemResponseDto>;
}
