import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateWallet(@Request() req) {
    return this.walletService.updateUserWallet(
      req.body.username,
      req.body.walletAddress,
    );
  }

  @Get('balance')
  @UseGuards(JwtAuthGuard)
  async getWalletBalance() {
    return this.walletService.getWalletBalance();
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateWallet(@Request() req) {
    return this.walletService.generateUserWallet(req.body.username);
  }

  @Post('setdefault')
  @UseGuards(JwtAuthGuard)
  async setDefaultWallet(@Request() req) {
    return this.walletService.setDefaultWallet(req.body);
  }
}
