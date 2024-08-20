import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { TokenSymbolEnum, TransactionType } from 'shared/enum';
export class FindManyTransactionParamsDto {
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
    name: 'searchTransactionHash',
    required: false,
    type: String,
    example: '0x000000000',
    description: 'Search transaction hash',
  })
  searchTransactionHash?: string;

  @ApiProperty({
    name: 'transactionTypes',
    required: false,
    type: String,
    description: 'transaction types',
    example: 'LOAN_CLAIMED,COLLATERAL_DEPOSITED',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TransactionType, { each: true })
  @Transform(
    ({ value }) =>
      value ? value.split(',').map((type: string) => type.trim()) : undefined,
    {
      toClassOnly: true,
    },
  )
  transactionTypes?: TransactionType[];

  @ApiProperty({
    name: 'assets',
    required: false,
    type: String,
    description: 'assets types',
    example: 'BTC,USDT',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TokenSymbolEnum, { each: true })
  @Transform(
    ({ value }) =>
      value ? value.split(',').map((type: string) => type.trim()) : undefined,
    {
      toClassOnly: true,
    },
  )
  assets?: TokenSymbolEnum[];
}
