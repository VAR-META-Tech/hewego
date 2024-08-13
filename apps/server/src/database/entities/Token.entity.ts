import { TokenSymbolEnum, TokenTypeEnum } from '../../shared/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'symbol',
    type: 'enum',
    nullable: true,
    enum: TokenSymbolEnum,
  })
  symbol: TokenSymbolEnum;

  @Column({
    name: 'type',
    type: 'enum',
    nullable: true,
    enum: TokenTypeEnum,
  })
  type: TokenTypeEnum;

  @Column({ name: 'address', type: 'varchar', nullable: true, unique: true })
  address: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
