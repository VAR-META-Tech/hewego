import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('latest_block')
export class LatestBlock {
  @PrimaryColumn()
  public currency: string;

  @Column({ name: 'block_number', nullable: true, type: 'bigint' })
  public blockNumber: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
