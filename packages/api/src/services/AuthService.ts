import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthUserDTO } from 'src/dtos/AuthUserDTO';
import { ConfigService } from '@nestjs/config';
import { User } from '../schemas/UserSchema';
import { UserService } from './UserService';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

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

  async login(res: Response, { emailOrUserName, password }: AuthUserDTO): Promise<void> {
    const user = await this.userService.findByLoginOrEmail(emailOrUserName);
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
    await this.userService.checkIsUsernameUnique(username);
    await this.userService.checkIsEmailUnique(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({
      username,
      email,
      password: hashedPassword,
    });
  }
}
