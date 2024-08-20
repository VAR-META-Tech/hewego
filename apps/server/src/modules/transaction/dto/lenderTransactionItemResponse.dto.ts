import { ApiProperty } from '@nestjs/swagger';

export class LenderTransactionItemResponseDto {
  @ApiProperty({ description: 'ID of the lender transaction' })
  id: number;

  @ApiProperty({ description: 'Type of the transaction' })
  transactionType: string;

  @ApiProperty({ description: 'Address of the lender' })
  lenderAddress: string;

  @ApiProperty({ description: 'Amount of the loan' })
  loanAmount: number;

  @ApiProperty({ description: 'Interest payment' })
  interestPayment: number;

  @ApiProperty({ description: 'Received amount' })
  receivedAmount: number;

  @ApiProperty({ description: 'Status of the transaction' })
  status: string;

  @ApiProperty({ description: 'Transaction hash' })
  transactionHash: string;

  @ApiProperty({ description: 'Creation date of the transaction' })
  createdAt: Date;

  @ApiProperty({ description: 'Name of the bond' })
  bondName: string;

  @ApiProperty({ description: 'ID of the bond' })
  bondId: number;

  @ApiProperty({ description: 'Loan token' })
  loanToken: string;

  @ApiProperty({ description: 'Symbol of the loan token' })
  loanTokenType: string;
}
