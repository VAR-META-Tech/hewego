import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumberString, IsOptional } from 'class-validator';
export class FindManyLenderTransactionParamsDto {
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
    name: 'supplies',
    required: false,
    type: String,
    example: '0x00,0x01',
    description: 'Supply',
  })
  @IsOptional()
  @IsArray()
  @Transform(
    ({ value }) =>
      value ? value.split(',').map((borrow: string) => borrow) : undefined,
    {
      toClassOnly: true,
    },
  )
  supplies?: string[];

  @ApiProperty({
    name: 'searchTransactionHash',
    required: false,
    type: String,
    example: '0x000000000',
    description: 'Search transaction hash',
  })
  searchTransactionHash?: string;
}
