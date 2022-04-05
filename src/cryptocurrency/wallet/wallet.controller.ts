import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Post('update')
  //   @UseGuards(JwtAuthGuard)
  async updateWallet(@Request() req) {
    return this.walletService.updateUserWallet(
      req.body.username,
      req.body.walletAddress,
    );
  }
}
