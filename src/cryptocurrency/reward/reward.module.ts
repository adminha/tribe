import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/entities/reward.entity';
import { User } from 'src/entities/user.entity';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, User])],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
