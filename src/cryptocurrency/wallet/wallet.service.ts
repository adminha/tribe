import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import {
  InjectSignerProvider,
  EthersSigner,
  BaseProvider,
  EthersContract,
  InjectContractProvider,
  InjectEthersProvider,
  InfuraProvider,
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
    @InjectSignerProvider()
    private readonly signerProvider: EthersSigner,
    @InjectEthersProvider()
    private readonly ethersProvider: InfuraProvider,
    @InjectContractProvider()
    private readonly contractProvider: EthersContract,
  ) {}

  async generateUserWallet(username) {
    const randomWallet = this.signerProvider.createRandomWallet();
    const user = await this.userRepository.findOne(
      { username: username },
      { relations: ['wallets'] },
    );
    const wallet = this.walletRepository.create({
      address: randomWallet.address,
    });
    user.wallets.push(wallet);
    await this.walletRepository.save(wallet);
    await this.userRepository.save(user);
    return {
      privatekey: randomWallet.privateKey,
      address: randomWallet.address,
    };
  }

  async updateUserWallet(username, address) {
    const user = await this.userRepository.findOne(
      { username: username },
      { relations: ['wallets'] },
    );
    const wallet = this.walletRepository.create({ address: address });
    user.wallets.push(wallet);
    await this.walletRepository.save(wallet);
    await this.userRepository.save(user);
    const { id, password, ...userObject } = user;
    return user;
  }

  async getWalletBalance() {
    const contractAbiFragment = [
      'function balanceOf(address tokenOwner) view returns (uint256)',
    ];
    const wallet = this.signerProvider.createWallet(
      process.env.ETHEREUM_WALLET_PRIVATE_KEY,
    );
    const contract = this.contractProvider.create(
      process.env.ETHEREUM_CONTRACT_ADDRESS,
      contractAbiFragment,
      wallet,
    );
    const balance = await contract.balanceOf(
      '0xa9c38c5b0b5baf8993724e34d1f5242bc460e034',
    );
    return balance;
  }

  async setDefaultWallet(data) {
    const user = await this.userRepository.findOne({ username: data.username });
    user.defaultWalletId = data.walletId;
    this.userRepository.save(user);
    const { id, password, ...userObject } = user;
    return user;
  }

  async getUserWallet(username) {
    const user = await this.userRepository.findOne(
      { username: username },
      { relations: ['wallets'] },
    );
    if (user.defaultWalletId) {
      return user.wallets.find((item) => item.id === user.defaultWalletId);
    } else {
      return user.wallets[0];
    }
  }
}
