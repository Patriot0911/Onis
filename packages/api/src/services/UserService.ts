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
    return this.userModel.findOne({
      $or: [{ username: emailOrUserName }, { email: emailOrUserName }],
    });
  }

  async findByLogin(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async toggleCollection(id: Types.ObjectId, collectionId: Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: id });

    const isCollectionSaved = user.savedCollections.some(
      (savedCollectionId: Types.ObjectId) =>
        savedCollectionId.equals(collectionId),
    );

    const updateOperation = isCollectionSaved
      ? { $pull: { savedCollections: collectionId } }
      : { $addToSet: { savedCollections: collectionId } };

    return this.userModel.updateOne({ _id: id }, updateOperation);
  }
}
