import { ApiResponseProperty } from '@nestjs/swagger';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class Pagination {
  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  itemCount: number;

  @ApiResponseProperty({
    type: Number,
    example: 100,
  })
  totalItems?: number;

  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  itemsPerPage: number;

  @ApiResponseProperty({
    type: Number,
    example: 10,
  })
  totalPages?: number;

  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  currentPage: number;

  constructor(paginationMeta: IPaginationMeta) {
    this.itemCount = paginationMeta.itemCount;
    this.totalItems = paginationMeta.totalItems;
    this.itemsPerPage = paginationMeta.itemsPerPage;
    this.totalPages = paginationMeta.totalPages;
    this.currentPage = paginationMeta.currentPage;
  }
}
