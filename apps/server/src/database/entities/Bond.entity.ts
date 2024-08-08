import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bonds')
export class Bond {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({ name: 'loan_term', type: 'int', nullable: true })
  loanTerm: number;

  @Column({ name: 'loan_amount', type: 'varchar', nullable: true })
  public loanAmount: string;
  

  @Column({ name: 'loan_token', type: 'varchar', nullable: true })
  public loanToken: string;


  @Column({ name: 'volume_bond', type: 'int', nullable: true })
  public volumeBond: number;

  @Column({
    name: 'interest_rate',
    type: 'decimal',
    precision: 40,
    scale: 4,
    nullable: false,
  })
  interestRate: number;

  @Column({ name: 'issuance_date', type: 'bigint', nullable: true })
  public issuanceDate: number;

  @Column({ name: 'maturity_date', type: 'bigint', nullable: true })
  public maturityDate: number;
 

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
