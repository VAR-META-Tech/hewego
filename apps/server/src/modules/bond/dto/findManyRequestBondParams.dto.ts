import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BondStatusEnum } from '../../../shared/enum';

export class FindManyRequestBondsParamsDto {
  @ApiProperty({
    name: 'status',
    required: true,
    type: String,
    description: `Available values: ${Object.values(BondStatusEnum).join(', ')}`,
    example: BondStatusEnum.ACTIVE,
  })
  @IsOptional()
  @IsEnum(Object.values(BondStatusEnum))
  status?: string;

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
}
