import { HoldingBondTransactionType } from "../../shared/enums";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("holding_bond_transactions")
export class HoldingBondTransaction {
  @PrimaryColumn()
  id: number;

  @Column({
    name: "transaction_type",
    type: "enum",
    enum: HoldingBondTransactionType,
  })
  transactionType: HoldingBondTransactionType;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
