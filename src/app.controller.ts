import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { TribeClient } from '@tribeplatform/gql-client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body.username, req.body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('tribe/get-guest-access-token')
  async getGuestAccessToken() {
    const client = new TribeClient({
      graphqlUrl: 'https://app.tribe.so/graphql',
    });

    const guestTokens = await client.getTokens(
      { networkDomain: 'adminha.tribeplatform.com' },
      'basic',
    );
    return guestTokens.accessToken;
  }

  @Get('tribe/get-member-access-token')
  async getMemberAccessToken() {
    const client = new TribeClient({
      clientId: process.env.TRIBE_CLIENT_ID,
      clientSecret: process.env.TRIBE_CLIENT_SECRET,
      graphqlUrl: 'https://app.tribe.so/graphql',
    });
    return client
      .generateToken({
        networkId: process.env.TRIBE_NETWORK_ID,
        memberId: process.env.TRIBE_MEMBER_ID,
      })
      .then(async (accessToken) => {
        return accessToken;
      });
  }
}
