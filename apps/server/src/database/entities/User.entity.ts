import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'username', type: 'varchar', length: 80, nullable: true })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 191,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    name: 'wallet_address',
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  walletAddress: string;

  @Column({ name: 'nonce', type: 'int', nullable: false, default: 0 })
  nonce: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
