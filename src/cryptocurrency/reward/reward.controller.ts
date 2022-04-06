import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private rewardsService: RewardService) {}
  @Post('send')
//   @UseGuards(JwtAuthGuard)
  sendReward(@Request() req) {
    return this.rewardsService.sendRewards(req.body);
  }
}
