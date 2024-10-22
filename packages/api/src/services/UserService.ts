import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../schemas/UserSchema';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByLogin(username: string): Promise<User> {
    return this.userModel
      .findOne({
        $or: [{ username }, { email: username }],
      })
      .exec();
  }

  async checkIsUsernameUnique(username: string) {
    const user = await this.findByLogin(username);

    if (user)
      throw new BadRequestException('User with this username already exists');
  }

  async checkIsEmailUnique(email: string) {
    const user = await this.findByLogin(email);

    if (user)
      throw new BadRequestException('User with this email already exists');
  }
}
