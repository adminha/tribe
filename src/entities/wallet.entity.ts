import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reward } from './reward.entity';
import { User } from './user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @OneToMany(() => Reward, (reward) => reward.walletAddress)
  @JoinColumn()
  rewards: Reward[];
}
