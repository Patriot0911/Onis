import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserMapper } from '../mappers/UserMapper';
import { UserResponse } from '../responses/UserResponse';
import { User } from '../schemas/UserSchema';
import { AuthService } from '../services/AuthService';
import { Access } from '../utils/security/Access';
import { UserRequest } from '../utils/security/UserRequest';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Access()
  @Get('me')
  async getMe(@UserRequest() user: User): Promise<UserResponse> {
    return UserMapper.getUserResponse(user);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: AuthUserDTO,
  ): Promise<UserResponse> {
    const user = await this.authService.login(res, body);
    return UserMapper.getUserResponse(user);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: CreateUserDTO,
  ): Promise<UserResponse> {
    const user = await this.authService.register(res, body);
    return UserMapper.getUserResponse(user);
  }
}
