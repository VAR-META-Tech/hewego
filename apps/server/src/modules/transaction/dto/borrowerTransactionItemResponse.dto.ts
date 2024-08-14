import { ApiProperty } from '@nestjs/swagger';
import { BorrowerTransactionType } from 'shared/enum';

export class BorrowerTransactionItemResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the transaction',
  })
  id: number;

  @ApiProperty({
    enum: BorrowerTransactionType,
    description: 'The type of the borrower transaction',
    nullable: true,
  })
  transactionType: BorrowerTransactionType;

  @ApiProperty({
    example: '0x1234567890abcdef',
    description: 'The address of the borrower',
    nullable: true,
  })
  borrowerAddress: string;

  @ApiProperty({
    example: 100000,
    description: 'The loan amount in the transaction',
    nullable: true,
  })
  loanAmount: number;

  @ApiProperty({
    example: 5000,
    description: 'The interest payment in the transaction',
    nullable: true,
  })
  interestPayment: number;

  @ApiProperty({
    example: 20000,
    description: 'The collateral amount in the transaction',
    nullable: true,
  })
  collateralAmount: number;

  @ApiProperty({
    example: 105000,
    description: 'The payment amount in the transaction',
    nullable: true,
  })
  paymentAmount: number;

  @ApiProperty({
    example: '0xabcdef1234567890',
    description: 'The transaction hash',
    nullable: true,
  })
  transactionHash: string;

  @ApiProperty({ description: 'Symbol of the loan token' })
  loanTokenType: string;

  @ApiProperty({ description: 'Symbol of the collateral token' })
  collateralTokenType: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated bond',
    nullable: true,
  })
  bondId: number;

  @ApiProperty({
    example: '2024-08-14T12:00:00Z',
    description: 'The date and time when the transaction was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-14T12:00:00Z',
    description: 'The date and time when the transaction was last updated',
  })
  updatedAt: Date;
}
