import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async updateUserWallet(username, address) {
    try {
      const user = await this.userRepository.findOne({ username: username });
      const wallet = this.walletRepository.create({ address: address });
      user.wallets = [await this.walletRepository.save(wallet)];
      this.userRepository.save(user);
      return wallet;
    } catch (error) {
      throw error;
    }
  }
}
