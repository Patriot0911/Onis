import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/UserSchema';
import { Model, RootFilterQuery } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async find(filter: RootFilterQuery<User>): Promise<User> {
    return this.userModel.findOne(filter).exec();
  }
}
