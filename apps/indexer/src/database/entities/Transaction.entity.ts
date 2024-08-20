import { BorrowerTransactionType, TransactionType } from "shared/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("transactions")
@Unique(["transactionHash", "userWalletAddress","bondId"])
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "transaction_type",
    type: "enum",
    enum: TransactionType,
    nullable: true,
  })
  transactionType: TransactionType;

  @Column({
    name: "user_wallet_address",
    type: "varchar",
    nullable: true,
  })
  userWalletAddress: string;

  @Column({
    name: "amount",
    type: "bigint",
    nullable: true,
  })
  public amount: number;

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
