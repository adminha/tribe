import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseProvider,
  InjectEthersProvider,
  EthersSigner,
  InjectSignerProvider,
  InjectContractProvider,
  EthersContract,
} from 'nestjs-ethers';
import { Reward } from 'src/entities/reward.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';

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
    private readonly walletService: WalletService,
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
    const userWallet = await this.walletService.getUserWallet(data.username);
    await contract.functions
      .transfer(userWallet.address, 1000)
      .then((success) => {
        const tx = this.rewardRepository.create({
          rewardReceived: 100,
          walletAddress: userWallet,
          tribeReactionId: data.tribeReactionId,
          transactionId: success.hash,
        });
        this.rewardRepository.save(tx);
        return success;
      });
  }

  async getUserRewards(data) {
    const user = await this.userRepository.findOne(
      { username: data.username },
      { relations: ['wallets', 'wallets.rewards'] },
    );
    return user.wallets;
  }
}
