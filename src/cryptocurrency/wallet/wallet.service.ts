import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InjectSignerProvider,
  EthersSigner,
  BaseProvider,
  EthersContract,
  InjectContractProvider,
  InjectEthersProvider,
} from 'nestjs-ethers';
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
    @InjectSignerProvider('TRT')
    private readonly signerProvider: EthersSigner,
    @InjectEthersProvider('TRT')
    private readonly ethersProvider: BaseProvider,
  ) {}

  async generateUserWallet(data) {
    const randomWallet = this.signerProvider.createRandomWallet();
    const user = await this.userRepository.findOne(
      { username: data.username },
      { relations: ['wallets'] },
    );
    const wallet = this.walletRepository.create({
      address: randomWallet.address,
    });
    user.wallets.push(wallet);
    await this.userRepository.save(user);
    return [randomWallet.privateKey, randomWallet.address];
  }

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

  async getWalletBalance() {
    return this.signerProvider.createWalletfromMnemonic(
      'vast decade describe tail sketch manage bottom cattle help wrong thunder burger',
    ).privateKey;
  }
}
