import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PriceFeedParamsDto {
  @ApiProperty({ example: 5.2, type: Number })
  @Transform(({ value }) => Number(value))
  collateralAmount: number;
  @ApiProperty({ example: 10, type: Number })
  @Transform(({ value }) => Number(value))
  loanAmount: number;
}
