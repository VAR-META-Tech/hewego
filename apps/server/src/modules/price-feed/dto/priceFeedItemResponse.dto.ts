import { ApiProperty } from '@nestjs/swagger';

export class PriceFeedItemResponseDto {
  @ApiProperty({ example: 2068039252.8, type: Number })
  collateralPrice: number;
  @ApiProperty({ example: 1000000000, type: Number })
  loanPrice: number;
  constructor(collateralPrice: number, loanPrice: number) {
    this.collateralPrice = collateralPrice;
    this.loanPrice = loanPrice;
  }
}
