import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
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
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectEthersProvider('TRT')
    private readonly ethersProvider: BaseProvider,
    @InjectSignerProvider('TRT')
    private readonly signerProvider: EthersSigner,
    @InjectContractProvider('TRT')
    private readonly contractProvider: EthersContract,
  ) {}

  async sendRewards(data) {
    const contractAbiFragment = [
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            type: 'uint256',
            name: '_tokens',
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
    contract.connect(this.ethersProvider);
    contract.signer
      .sendTransaction({
        from: process.env.ETHEREUM_WALLET_ADDRESS,
        to: data.address,
        value: ethers.utils.parseUnits('1000.0', 18),
        nonce: this.ethersProvider.getBlockNumber(),
        gasLimit: 1000000,
        gasPrice: ethers.utils.hexlify(await this.ethersProvider.getGasPrice()),
      })
      .then(
        (s) => {
          console.log(s);
        },
        (f) => {
          console.log(f);
        },
      );
  }
  async getUserWalletAddress(data) {
    const userObject = await this.userRepository.findOne(
      { username: data.username },
      {
        relations: ['wallets'],
      },
    );
    return userObject.wallets[0].address;
  }
}
