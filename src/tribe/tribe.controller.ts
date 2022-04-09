import { Controller, Get } from '@nestjs/common';
import { TribeService } from './tribe.service';

@Controller('tribe')
export class TribeController {
  constructor(private tribeService: TribeService) {}
  @Get('tribe/get-guest-access-token')
  async getGuestAccessToken() {
    return this.tribeService.getGuestAccessToken();
  }

  @Get('tribe/get-member-access-token')
  async getMemberAccessToken() {
    return this.tribeService.getMemberAccessToken();
  }
}
