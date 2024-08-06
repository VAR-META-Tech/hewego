import { Meta } from '../type/meta';
import { ApiResponseProperty } from '@nestjs/swagger';
import { MetaResponse } from './metaResponse.dto';
import { MetaResponsePaginationDto } from './MetaResponsePagination.dto';

export class BaseResponse {
  @ApiResponseProperty({
    type: MetaResponse,
    example: {
      code: 200,
      message: 'Successful',
    },
  })
  meta?: Meta;
}

export class BaseResponsePagination {
  @ApiResponseProperty({
    type: MetaResponsePaginationDto,
  })
  meta?: Meta;
}
