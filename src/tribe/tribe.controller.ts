import { Controller, Get } from '@nestjs/common';
import { TribeService } from './tribe.service';

@Controller('tribe')
export class TribeController {
  constructor(private tribeService: TribeService) {}
  @Get('get-guest-access-token')
  async getGuestAccessToken() {
    return this.tribeService.getGuestAccessToken();
  }

  @Get('get-member-access-token')
  async getMemberAccessToken() {
    return this.tribeService.getMemberAccessToken();
  }
}
