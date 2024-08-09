import { ApiProperty } from '@nestjs/swagger';
export class BorrowBondRequestSummaryDto {
  @ApiProperty({ description: 'Total amount of the loan', type: Number })
  totalLoanAmount: number;

  @ApiProperty({ description: 'Total amount repaid', type: Number })
  totalRepaymentAmount: number;

  @ApiProperty({
    description: 'Total amount of collateral deposited',
    type: Number,
  })
  totalDepositedCollateral: number;

  @ApiProperty({
    description: 'Total amount of collateral repaid',
    type: Number,
  })
  totalRepaymentCollateral: number;

  @ApiProperty({ description: 'Total number of bonds sold', type: Number })
  totalBondsSold: number;

  @ApiProperty({ description: 'Total number of bonds issued', type: Number })
  totalBondsIssued: number;

  constructor(
    totalLoanAmount: number,
    totalRepaymentAmount: number,
    totalDepositedCollateral: number,
    totalRepaymentCollateral: number,
    totalBondsSold: number,
    totalBondsIssued: number,
  ) {
    this.totalLoanAmount = totalLoanAmount;
    this.totalRepaymentAmount = totalRepaymentAmount;
    this.totalDepositedCollateral = totalDepositedCollateral;
    this.totalRepaymentCollateral = totalRepaymentCollateral;
    this.totalBondsSold = totalBondsSold;
    this.totalBondsIssued = totalBondsIssued;
  }
}
