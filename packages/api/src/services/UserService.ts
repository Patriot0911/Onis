import { Injectable } from '@nestjs/common';
import { User } from '../schemas/UserSchema';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserRepository } from '../repositories/UserRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.userRepository.create(data);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.find({ username });
  }
}
