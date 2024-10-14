import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from './UserService';
import { LoginDTO } from '../dtos/LoginDTO';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/UserSchema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getMe(user: User) {
    return this.userService.findByUsername(user.username);
  }

  async login(res: Response, { username, password }: LoginDTO) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User with this username dont exists');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Passwords dont match');
    }

    const payload = { sub: user.id, username: user.username };
    res.cookie('userToken', this.jwtService.sign(payload), {
      expires: new Date(Date.now() + 3600000),
    });
  }

  async logout(res: Response) {
    res.cookie('userToken', '', { expires: new Date(Date.now()) });
  }

  async register({ username, password, avatar }: CreateUserDTO) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new BadRequestException('User with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      username,
      password: hashedPassword,
      avatar,
    });
  }
}
