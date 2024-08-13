import { ApiProperty } from '@nestjs/swagger';

export class HoldingBondSummaryItemResponseDto {
  @ApiProperty({
    type: String,
    description: 'Total capital and interest recieved',
  })
  totalCapitalAndInterestRecieved: string;

  @ApiProperty({
    type: String,
    description: 'Total number of bonds purchased',
  })
  totalAmountBondPurchased: string;

  @ApiProperty({
    type: Number,
    description: 'Total number of bonds purchase',
  })
  totalBondPurchased: number;
  constructor(
    totalCapitalAndInterestRecieved: string,
    totalAmountBondPurchased: string,
    totalBondPurchased: number,
  ) {
    this.totalCapitalAndInterestRecieved = totalCapitalAndInterestRecieved;
    this.totalAmountBondPurchased = totalAmountBondPurchased;
    this.totalBondPurchased = totalBondPurchased;
  }
}
