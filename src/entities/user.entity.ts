import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // boolean, true/false for day/night mode
  @Column({ default: false })
  frontTheme: boolean;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];

  @Column({ nullable: true })
  defaultWalletId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
