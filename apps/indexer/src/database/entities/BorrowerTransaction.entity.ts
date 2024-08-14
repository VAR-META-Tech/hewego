import { BorrowerTransactionType } from "shared/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("borrower_transactions")
@Unique(["transactionHash", "borrowerAddress","bondId"])
export class BorrowerTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "transaction_type",
    type: "enum",
    enum: BorrowerTransactionType,
    nullable: true,
  })
  transactionType: BorrowerTransactionType;

  @Column({
    name: "borrower_address",
    type: "varchar",
    nullable: true,
  })
  borrowerAddress: string;

  @Column({
    name: "loan_amount",
    type: "bigint",
    nullable: true,
  })
  public loanAmount: number;

  @Column({
    name: "interest_payment",
    type: "bigint",
    nullable: true,
  })
  interestPayment: number;

  @Column({
    name: "collateral_amount",
    type: "bigint",
    nullable: true,
  })
  collateralAmount: number;

  @Column({
    type: "bigint",
    name: "payment_amount",
    nullable: true,
  })
  paymentAmount: number;

  @Column({
    name: "transaction_hash",
    type: "varchar",
    nullable: true,
  })
  transactionHash: string;

  @Column({
    type: "varchar",
    name: "status",
    length: 100,
    nullable: true
  })
  status: string;


  @Column({ name: "bond_id", type: "int", nullable: true })
  bondId: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
