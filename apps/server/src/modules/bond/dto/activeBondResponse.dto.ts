import { PaginationResponseDto } from 'common/dto/paginationResponse.dto';
import { ActiveBondItemResponseDto } from './activeBondItemResponse.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ActiveBondResponseDto extends PaginationResponseDto {
  @ApiResponseProperty({
    type: [ActiveBondItemResponseDto],
  })
  data: Array<ActiveBondItemResponseDto>;
}
