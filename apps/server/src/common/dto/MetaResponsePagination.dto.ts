import { Pagination } from './pagination';
import { ApiResponseProperty } from '@nestjs/swagger';

export class MetaResponsePaginationDto {
  @ApiResponseProperty({
    type: Number,
    example: 200,
  })
  code: number | undefined;

  @ApiResponseProperty({
    type: String,
    example: 'Successful',
  })
  message?: string;

  @ApiResponseProperty({
    type: Pagination,
    example: {
      itemCount: 10,
      totalItems: 100,
      itemsPerPage: 10,
      totalPages: 10,
      currentPage: 0,
    },
  })
  pagination?: Pagination;
}
