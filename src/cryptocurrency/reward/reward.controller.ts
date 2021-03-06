import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private rewardsService: RewardService) {}
  @Post('send')
  @UseGuards(JwtAuthGuard)
  sendReward(@Body() data) {
    return this.rewardsService.sendRewards(data);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUserRewards(@Query() username: string) {
    return this.rewardsService.getUserRewards(username);
  }
}
