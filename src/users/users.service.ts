import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(data: CreateUserDTO) {
    const newUser = this.userRepository.create({
      username: data.firstname + data.lastname,
      password: data.password,
      firstName: data.firstname,
      lastName: data.lastname,
    });
    await this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne(
      { username: username },
      { relations: ['wallets'] },
    );
  }

  async update(data) {
    const user = await this.userRepository.findOne({ username: data.username });
    user.firstName = data.firstname;
    user.lastName = data.lastname;
    user.password = data.password;
    await this.userRepository.save(user);
    const { id, password, ...userObject } = user;
    return userObject;
  }
}
