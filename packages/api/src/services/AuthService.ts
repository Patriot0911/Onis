import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
  ) {}

  async getMe(user: User): Promise<User> {
    return this.userService.findByLogin(user.username);
  }

  async login(res: Response, { username, password }: LoginDTO): Promise<void> {
    const user = await this.userService.findByLogin(username);
    if (!user) {
      throw new BadRequestException('User with this username does not exists');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Passwords dont match');
    }

    const payload = { sub: user.id, username: user.username };
    res.cookie('userToken', this.jwtService.sign(payload), {
      expires: new Date(
        Date.now() + this.configService.get<number>('JWT_EXPIRES') * 1000,
      ),
    });
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('userToken');
  }

  async register({ username, email, password }: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      username,
      email,
      password: hashedPassword,
    });
  }
}
