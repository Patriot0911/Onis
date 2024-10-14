import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/UserSchema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHello() {
    return this.userModel.create({
      data: 2134,
    });
  }
}
