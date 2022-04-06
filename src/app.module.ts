import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RewardModule } from './cryptocurrency/reward/reward.module';
import { WalletModule } from './cryptocurrency/wallet/wallet.module';
import { UsersModule } from './users/users.module';
import { EthersModule, ROPSTEN_NETWORK } from 'nestjs-ethers';

@Module({
  imports: [
    EthersModule.forRoot({
      token: 'TRT',
      network: ROPSTEN_NETWORK,
    }),
    AuthModule,
    UsersModule,
    WalletModule,
    RewardModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
