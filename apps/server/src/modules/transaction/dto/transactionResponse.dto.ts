import { PaginationResponseDto } from 'common/dto/paginationResponse.dto';
import { TransactionItemResponseDto } from './transactionItemResponse.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class TransactionResponseDto extends PaginationResponseDto {
  @ApiResponseProperty({
    type: [TransactionItemResponseDto],
  })
  data: Array<TransactionItemResponseDto>;
}
