import { IsArray, IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BorrowEnum, CollateralEnum, LoarnTermEnum } from 'shared/enum';
import { Transform } from 'class-transformer';

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
    name: 'loanTerms',
    required: false,
    type: String,
    description: 'Loan term.',
    example: '1,2,3',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(LoarnTermEnum, { each: true })
  @Transform(
    ({ value }) =>
      value
        ? value.split(',').map((term: string) => parseInt(term, 10))
        : undefined,
    {
      toClassOnly: true,
    },
  )
  loanTerms?: LoarnTermEnum[];
  @ApiProperty({
    name: 'borrows',
    required: false,
    type: String,
    example: 'USDC,USDT',
    description: 'Borrow',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(BorrowEnum, { each: true })
  @Transform(
    ({ value }) =>
      value
        ? value.split(',').map((term: string) => term as BorrowEnum)
        : undefined,
    {
      toClassOnly: true,
    },
  )
  borrows?: BorrowEnum[];

  @ApiProperty({
    name: 'collaterals',
    required: false,
    type: String,
    example: 'USDC,USDT',
    description: 'Collateral',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(CollateralEnum, { each: true })
  @Transform(
    ({ value }) =>
      value
        ? value.split(',').map((term: string) => term as CollateralEnum)
        : undefined,
    {
      toClassOnly: true,
    },
  )
  collaterals?: CollateralEnum[];
}
