import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("users")
@Unique(["walletAddress", "accountId"])
export class User {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({
    name: "wallet_address",
    type: "varchar",
    nullable: true,
  })
  walletAddress: string;

  @Column({
    name: "account_id",
    type: "varchar",
    nullable: true,
  })
  accountId: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
