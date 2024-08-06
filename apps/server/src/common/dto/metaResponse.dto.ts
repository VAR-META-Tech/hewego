import { ApiResponseProperty } from '@nestjs/swagger';

export class MetaResponse {
  @ApiResponseProperty({
    type: Number,
    example: 200,
  })
  code?: number;

  @ApiResponseProperty({
    type: String,
    example: 'Successful',
  })
  message?: string;
}
