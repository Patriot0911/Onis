import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthUserDTO } from 'src/dtos/AuthUserDTO';
import { ConfigService } from '@nestjs/config';
import { User } from '../schemas/UserSchema';
import { UserService } from './UserService';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(res: Response, { email, password }: AuthUserDTO): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User with this username does not exists');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Passwords dont match');
    }

    const token = this.generateToken(user.id, user.username);
    res.cookie('userToken', token, {
      expires: new Date(
        Date.now() + this.configService.get<number>('JWT_EXPIRES') * 1000,
      ),
    });
    return user;
  }

  generateToken(userId: Types.ObjectId, username: string) {
    const payload = { sub: userId, username };
    return this.jwtService.sign(payload);
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('userToken');
  }

  async register(
    res: Response,
    { username, email, password }: CreateUserDTO,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id, user.username);
    res.cookie('userToken', token, {
      expires: new Date(
        Date.now() + this.configService.get<number>('JWT_EXPIRES') * 1000,
      ),
    });
    return user;
  }
}
