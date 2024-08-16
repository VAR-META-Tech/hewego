import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'shared/enum';

export class TransactionItemResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the transaction',
  })
  id: number;

  @ApiProperty({
    enum: TransactionType,
    description: 'The type of the borrower transaction',
    nullable: true,
  })
  transactionType: TransactionType;

  @ApiProperty({
    example: '0x1234567890abcdef',
    description: 'The address of the borrower',
    nullable: true,
  })
  userWalletAddress: string;

  @ApiProperty({
    example: '100000',
    type: String,
    description: 'The loan amount in the transaction',
    nullable: true,
  })
  amount: string;

  @ApiProperty({
    example: 'Completed',
    description: 'Transaction status',
    nullable: true,
  })
  status: string;

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
    description: 'The name of the bond',
    example: 'Corporate Bond ABC',
  })
  bondName: string;

  @ApiProperty({
    description: 'The ID of the loan token associated with the bond',
    example: 456,
  })
  loanToken: number;

  @ApiProperty({
    description: 'The ID of the loan token associated with the bond',
    example: 456,
  })
  collateralToken: number;

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
