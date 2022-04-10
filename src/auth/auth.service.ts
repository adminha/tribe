import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const payload = { username: user.username, sub: user.password };
      const { id, password, ...userobject } = user;
      return {
        access_token: this.jwtService.sign(payload),
        user: userobject,
      };
    }
    throw new UnauthorizedException();
  }

  async validate(payload: any) {
    const user: User = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
