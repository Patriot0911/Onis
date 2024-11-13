import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/UserSchema';
import { EntityByIdPipe } from './EntityByIdPipe';

@Injectable()
export class UserByIdPipe extends EntityByIdPipe<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
