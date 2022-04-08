import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseProvider,
  InjectEthersProvider,
  EthersSigner,
  InjectSignerProvider,
  InjectContractProvider,
  EthersContract,
  InfuraProvider,
} from 'nestjs-ethers';
import { Reward } from 'src/entities/reward.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,
    @InjectSignerProvider()
    private readonly signerProvider: EthersSigner,
    @InjectContractProvider()
    private readonly contractProvider: EthersContract,
  ) {}

  async sendRewards(data) {
    const contractAbiFragment = [
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            name: 'receiver',
            type: 'address',
          },
          {
            type: 'uint256',
            name: 'numTokens',
          },
        ],
        constant: false,
        outputs: [],
        payable: false,
      },
    ];
    const wallet = this.signerProvider.createWallet(
      process.env.ETHEREUM_WALLET_PRIVATE_KEY,
    );
    const contract = this.contractProvider.create(
      process.env.ETHEREUM_CONTRACT_ADDRESS,
      contractAbiFragment,
      wallet,
    );
    return await contract.functions.transfer(
      '0xa9c38c5b0B5baf8993724E34D1F5242bc460E034',
      1000,
    );
  }
  async getUserWalletAddress(data) {
    const userObject = await this.userRepository.findOne(
      { username: data.username },
      {
        relations: ['wallets'],
      },
    );
    return userObject.wallets;
  }
}
