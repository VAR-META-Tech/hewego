import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("bonds")
@Unique("uk_bondId", ["bondId"])
export class Bond {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({
    name: "name",
    type: "varchar",
    nullable: true,
  })
  name: string;

  @Column({ name: "loan_term", type: "int", nullable: true })
  loanTerm: number;

  @Column({
    name: "loan_amount",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  public loanAmount: number;

  @Column({ name: "loan_token", type: "varchar", nullable: true })
  public loanToken: string;

  @Column({
    name: "collateral_amount",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  public collateralAmount: number;

  @Column({ name: "collateral_token", type: "varchar", nullable: true })
  public collateralToken: string;

  @Column({ name: "volume_bond", type: "int", nullable: true })
  public volumeBond: number;

  @Column({
    name: "borrower_interest_rate",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  borrowerInterestRate: number;


  @Column({
    name: "lender_interest_rate",
    type: "decimal",
    precision: 40,
    scale: 8,
    nullable: true,
  })
  lenderInterestRate: number;

  @Column({ name: "issuance_date", type: "bigint", nullable: true })
  public issuanceDate: number;

  @Column({ name: "maturity_date", type: "bigint", nullable: true })
  public maturityDate: number;

  @Column({
    name: "borrower_address",
    type: "varchar",
    length: 80,
    nullable: true,
  })
  borrowerAddress: string;


  @Column({ type: "varchar", name: "contract_address", nullable: true })
  contractAddress: string;

  @Column({ type: "varchar", name: "transaction_hash", nullable: true })
  transactionHash: string;

  @Column({ type: "varchar", name: "onchain_status", nullable: true })
  onchainStatus: string; 
  

  @Column({ type: "varchar", name: "status", nullable: true })
  status: string; 
  

  @Column({ name: "bond_id", type: "int", nullable: true })
  public bondId: number;

  @Column({ name: "block_number", type: "bigint", nullable: true })
  blockNumber: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
