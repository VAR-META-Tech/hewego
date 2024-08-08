import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bond_checkouts')
export class BondCheckout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'bond_id', type: 'int', nullable: true })
  bondId: number;

  @Column({
    name: 'lender_id',
    type: 'int',
    nullable: true,
  })
  lenderId: number;

  @Column({
    name: 'amount_purchased',
    type: 'decimal',
    precision: 40,
    scale: 8,
    nullable: true,
  })
  amountPurchased: number;

  @Column({ name: 'amount_purchased_bond', type: 'int', nullable: true })
  amountPurchasedBond: number;

  @Column({ name: 'purchase_date', type: 'date' })
  purchaseDate: Date;


  @Column({ name: 'status', type: 'varchar', length: 50 })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
