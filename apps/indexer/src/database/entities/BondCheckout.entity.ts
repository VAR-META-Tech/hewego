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
    name: 'lender_address',
    type: 'varchar',
    nullable: true,
  })
  lenderAddress: string;

  @Column({
    name: 'purchased_amount',
    type: 'bigint',
    nullable: true,
  })
  purchasedAmount: number;


  @Column({ name: "claimed_at", type: "timestamp", nullable: true })
  claimedAt: Date;

  @Column({ name: 'bond_amount', type: 'int', nullable: true })
  bondAmount: number;

  @Column({ name: 'purchase_date', type: 'date' })
  purchaseDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
