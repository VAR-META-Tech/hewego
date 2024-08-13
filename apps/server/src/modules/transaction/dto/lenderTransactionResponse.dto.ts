import { ApiResponseProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from 'common/dto/paginationResponse.dto';
import { LenderTransactionItemResponseDto } from './lenderTransactionItemResponse.dto';

export class LenderTransactionResponseDto extends PaginationResponseDto {
  @ApiResponseProperty({
    type: [LenderTransactionItemResponseDto],
  })
  data: Array<LenderTransactionItemResponseDto>;
}
