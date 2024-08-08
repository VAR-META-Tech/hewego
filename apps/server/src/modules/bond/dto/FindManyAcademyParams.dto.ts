import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LoarnTermEnum } from 'shared/enum';

export class FindManyActiveBondsParams {
  @ApiProperty({
    name: 'page',
    required: false,
    type: String,
    description: 'Page number. Starts from 1.',
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({
    name: 'limit',
    required: false,
    type: String,
    description: 'Number of items per page.',
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiProperty({
    name: 'loarnTems',
    required: false,
    type: String,
    enum: [LoarnTermEnum],
    description: 'Loan term.',
  })
  @IsOptional()
  @IsEnum(LoarnTermEnum)
  loarnTerms?: LoarnTermEnum;
}
