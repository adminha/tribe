import { Controller, Post, Body, NotAcceptableException } from '@nestjs/common';
import { TribeService } from 'src/tribe/tribe.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tribeService: TribeService,
  ) {}

  @Post('register')
  async create(@Body() data: CreateUserDTO) {
    return await this.tribeService.createTribeUser(data).then(
      async (success) => {
        await this.usersService.create(data);
        return success;
      },
      (failure) => {
        throw new NotAcceptableException(
          failure,
          failure.response.errors[0].message,
        );
      },
    );
  }

  @Post('update')
  updateUser(@Body() data: CreateUserDTO) {
    return this.usersService.update(data);
  }
}
