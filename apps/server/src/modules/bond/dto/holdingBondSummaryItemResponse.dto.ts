import { ApiProperty } from '@nestjs/swagger';

export class HoldingBondSummaryItemResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Total capital and interest recieved',
  })
  totalCapitalAndInterestRecieved: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of bonds purchased',
  })
  totalAmountBondPurchased: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of bonds purchase',
  })
  totalBondPurchased: number;
  constructor(
    totalCapitalAndInterestRecieved: number,
    totalAmountBondPurchased: number,
    totalBondPurchased: number,
  ) {
    this.totalCapitalAndInterestRecieved = totalCapitalAndInterestRecieved;
    this.totalAmountBondPurchased = totalAmountBondPurchased;
    this.totalBondPurchased = totalBondPurchased;
  }
}
