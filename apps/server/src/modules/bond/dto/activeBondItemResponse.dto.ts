import { ApiProperty } from '@nestjs/swagger';

export class ActiveBondItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Bond Name', required: false })
  name: string;

  @ApiProperty({ example: 12, required: false })
  loanTerm: number;

  @ApiProperty({ example: 1000.12345678, required: false })
  loanAmount: number;

  @ApiProperty({ example: 'USD', required: false })
  loanToken: string;

  @ApiProperty({ example: 2000.12345678, required: false })
  collateralAmount: number;

  @ApiProperty({ example: 'ETH', required: false })
  collateralToken: string;

  @ApiProperty({ example: 100, required: false })
  volumeBond: number;

  @ApiProperty({ example: 5.12345678, required: false })
  interestRate: number;

  @ApiProperty({ example: 1609459200, required: false }) // Timestamp example
  issuanceDate: number;

  @ApiProperty({ example: 1672531199, required: false }) // Timestamp example
  maturityDate: number;

  @ApiProperty({ example: '0x1234567890abcdef', required: true })
  borrowerAddress: string;

  @ApiProperty({ example: '2021-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00Z' })
  updatedAt: Date;
}
