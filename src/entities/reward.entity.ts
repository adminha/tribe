import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.rewards)
  @JoinColumn()
  walletAddress: Wallet;

  @Column({ default: 0 })
  rewardReceived: number;

  @Column()
  tribeReactionId: string;

  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
