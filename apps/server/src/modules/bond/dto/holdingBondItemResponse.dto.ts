import { ApiProperty } from '@nestjs/swagger';

export class HoldingBondItemResponseDto {
  @ApiProperty({ description: 'The name of the bond' })
  name: string;

  @ApiProperty({
    description: 'The maturity date of the bond in timestamp format',
  })
  maturityDate: string;

  @ApiProperty({ description: 'The amount of the bond' })
  bondAmount: number;

  @ApiProperty({
    description: 'The total purchased amount of the bond as a string',
  })
  purchasedAmount: number; // Assuming this may be a large number represented as a string

  @ApiProperty({
    description: 'The purchase date of the bond in ISO 8601 format',
  })
  purchaseDate: string;
  @ApiProperty({ description: 'The wallet address of the lender' })
  lenderWalletAddress: string;

  @ApiProperty({ description: 'The identifier for the bond checkout' })
  id: number;
  @ApiProperty({ description: 'The account ID of the lender' })
  lenderAccountId: string;
}
