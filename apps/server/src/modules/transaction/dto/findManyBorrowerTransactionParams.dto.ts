import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindManyBorrowerTransactionParams {
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
}
