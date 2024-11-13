import { Injectable } from '@nestjs/common';
import { User } from '../schemas/UserSchema';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByLoginOrEmail(emailOrUserName: string): Promise<User> {
    return this.userModel
      .findOne({
        $or: [
          {
            username: emailOrUserName,
          }, {
            email: emailOrUserName,
          },
        ],
      })
      .exec();
  };

  async findByLogin(username: string): Promise<User> {
    return this.userModel
      .findOne({ username, })
      .exec();
  }

  saveCollection(id: string, collectionId: string) {
    return this.userModel.updateOne(
      { _id: id },
      { $addToSet: { savedCollections: collectionId } },
    );
  }

  removeCollection(id: string, collectionId: string) {
    return this.userModel.updateOne(
      { _id: id },
      { $pull: { savedCollections: collectionId } },
    );
  }
}
