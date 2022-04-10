import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

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

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body.username, req.body.password);
  }

  @Post('auth/validate')
  async validate(@Request() req) {
    return this.authService.validate(req.body);
  }
}
