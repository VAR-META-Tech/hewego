import {  LenderTransactionType } from "../../shared/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
@Unique(["transactionHash", "lenderAddress","bondId"])
@Entity("lender_transactions")
export class LenderTransaction {
  @PrimaryColumn()
  id: number;

  @Column({
    name: "transaction_type",
    type: "enum",
    enum: LenderTransactionType,
  })
  transactionType: LenderTransactionType;

  @Column({
    name: "lender_address",
    type: "varchar",
    nullable: true,
  })
  lenderAddress: string;

  @Column({
    type: "bigint",
    name: "loan_amount",
    nullable: true
  })
  loanAmount: number;

  @Column({
    type: "bigint",
    name: "interest_payment",
    nullable: true
  })
  interestPayment: number;


  @Column({
    type: "bigint",
    name: "received_amount",
    nullable: true
  })
  receivedAmount: number;

  @Column({
    type: "varchar",
    name: "status",
    length: 100,
    nullable: true
  })
  status: string;

  @Column({
    name: "transaction_hash",
    type: "varchar",
    nullable: true
  })
  transactionHash: string; 

  @Column({ name: 'bond_id', type: 'int', nullable: true })
  bondId: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
