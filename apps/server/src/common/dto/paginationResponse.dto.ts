import { ApiResponseProperty } from '@nestjs/swagger';
import { MetaResponsePaginationDto } from './MetaResponsePagination.dto';

export class PaginationResponseDto {
  @ApiResponseProperty({
    type: MetaResponsePaginationDto,
  })
  meta: MetaResponsePaginationDto;
}
