import { ApiProperty } from '@nestjs/swagger';
export class BorrowBondRequestSummaryDto {
  @ApiProperty({ description: 'Total amount repaid', type: Number })
  totalBondsIssued: number;

  @ApiProperty({ description: 'Total amount of the loan', type: Number })
  totalBondIssuedValue: number;

  @ApiProperty({
    description: 'Total amount of collateral deposited',
    type: Number,
  })
  totalDepositedCollateral: number;

  @ApiProperty({
    description: 'Total amount of collateral repaid',
    type: Number,
  })
  totalLiquidatedAmount: number;

  @ApiProperty({ description: 'Total number of bonds sold', type: Number })
  totalBondsSold: number;

  @ApiProperty({ description: 'Total number of bonds issued', type: Number })
  totalRepaymentInterestRate: number;

  constructor(
    totalBondsIssued: number,
    totalBondIssuedValue: number,
    totalDepositedCollateral: number,
    totalLiquidatedAmount: number,
    totalRepaymentInterestRate: number,
  ) {
    this.totalBondsIssued = totalBondsIssued;
    this.totalBondIssuedValue = totalBondIssuedValue;
    this.totalDepositedCollateral = totalDepositedCollateral;
    this.totalLiquidatedAmount = totalLiquidatedAmount;
    this.totalRepaymentInterestRate = totalRepaymentInterestRate;
  }
}
