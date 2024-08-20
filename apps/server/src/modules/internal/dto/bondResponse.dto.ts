import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from 'common/dto/baseResponse.dto';
import { ActiveBondItemResponseDto } from 'modules/bond/dto/activeBondItemResponse.dto';

export class BondResponseDto extends BaseResponse {
  @ApiResponseProperty({
    type: [ActiveBondItemResponseDto],
  })
  data: Array<ActiveBondItemResponseDto>;
}
