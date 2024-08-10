import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('bonds')
@Unique(['bondId', 'contractAddress'])
export class Bond {
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({ name: 'loan_term', type: 'int', nullable: true })
  loanTerm: number;

  @Column({
    name: 'loan_amount',
    type: 'varchar',
    nullable: true,
  })
  public loanAmount: string;

  @Column({ name: 'total_sold', type: 'int', nullable: false, default: 0 })
  totalSold: number;
  @Column({ name: 'loan_token', type: 'varchar', nullable: true })
  public loanToken: string;

  @Column({
    name: 'collateral_amount',
    type: 'varchar',

    nullable: true,
  })
  public collateralAmount: string;

  @Column({ name: 'collateral_token', type: 'varchar', nullable: true })
  public collateralToken: string;

  @Column({ name: 'volume_bond', type: 'int', nullable: true })
  public volumeBond: number;

  @Column({
    name: 'borrower_interest_rate',
    type: 'decimal',
    precision: 40,
    scale: 8,
    nullable: true,
  })
  borrowerInterestRate: number;

  @Column({
    name: 'lender_interest_rate',
    type: 'decimal',
    precision: 40,
    scale: 8,
    nullable: true,
  })
  lenderInterestRate: number;

  @Column({ name: 'issuance_date', type: 'bigint', nullable: true })
  public issuanceDate: number;

  @Column({ name: 'maturity_date', type: 'bigint', nullable: true })
  public maturityDate: number;

  @Column({
    name: 'borrower_address',
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  borrowerAddress: string;

  @Column({
    type: 'varchar',
    name: 'contract_address',
    nullable: true,
  })
  contractAddress: string;

  @Column({ type: 'varchar', name: 'transaction_hash', nullable: true })
  transactionHash: string;

  @Column({ type: 'varchar', name: 'onchain_status', nullable: true })
  onchainStatus: string;

  @Column({ type: 'varchar', name: 'status', nullable: true })
  status: string;

  @PrimaryColumn({ name: 'bond_id', type: 'int' })
  public bondId: number;

  @Column({ name: 'block_number', type: 'bigint', nullable: true })
  blockNumber: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
