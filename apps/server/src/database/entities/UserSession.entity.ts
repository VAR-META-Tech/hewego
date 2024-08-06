import { User } from './User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp' })
  expiresAt: Date = new Date(
    Date.now() + Number(process.env.USER_REFRESH_TOKEN_LIFETIME) || 3600 * 1000,
  );
}
