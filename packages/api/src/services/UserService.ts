import { Injectable } from '@nestjs/common';
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

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
}
