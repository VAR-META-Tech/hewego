import { ApiProperty } from '@nestjs/swagger';

export class LatestTokenPriceParamsDto {
  @ApiProperty({ example: 5.2, type: Number })
  collateralAmount: number;
  @ApiProperty({ example: 5.2, type: Number })
  loanAmount: number;
}
