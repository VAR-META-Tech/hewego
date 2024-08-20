import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PriceFeedParamsDto {
  @ApiProperty({ example: '', type: String })
  collateralToken: string;

  @ApiProperty({ example: '', type: String })
  loanToken: string;

  @ApiProperty({ example: 10, type: Number })
  @Transform(({ value }) => Number(value))
  loanAmount: number;
}
