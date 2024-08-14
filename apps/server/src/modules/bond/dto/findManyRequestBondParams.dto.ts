import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BondStatusEnum, LoanTermEnum } from '../../../shared/enum';
import { Transform } from 'class-transformer';

export class FindManyRequestBondsParamsDto {
  @ApiProperty({
    name: 'status',
    required: true,
    type: String,
    description: `Available values: ${Object.values(BondStatusEnum).join(', ')}`,
    example: BondStatusEnum.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(Object.values(BondStatusEnum))
  status: string;

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
    name: 'bondDuration',
    required: false,
    type: String,
    description: 'bondDuration',
    example: '1,2,3',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(LoanTermEnum, { each: true })
  @Transform(
    ({ value }) =>
      value
        ? value.split(',').map((term: string) => parseInt(term, 10))
        : undefined,
    {
      toClassOnly: true,
    },
  )
  bondDuration?: LoanTermEnum[];

  @ApiProperty({
    required: false,
    example: '2024-01-21T14:41:09.644Z',
  })
  @IsOptional()
  @IsDateString()
  issuanceStartDate?: string;

  @ApiProperty({
    example: '2024-02-29T14:41:09.644Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  issuanceEndDate?: string;

  @ApiProperty({
    required: false,
    example: '2024-01-21T14:41:09.644Z',
  })
  @IsOptional()
  @IsDateString()
  maturityStartDate?: string;

  @ApiProperty({
    example: '2024-02-29T14:41:09.644Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  maturityEndDate?: string;

  @ApiProperty({
    type: String,
    description: 'Bond name',
    required: false,
  })
  name: string;
}
