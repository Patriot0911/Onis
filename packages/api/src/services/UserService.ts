import { Injectable } from '@nestjs/common';
import { User } from '../schemas/UserSchema';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ParticipantService } from './ParticipantService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly participantService: ParticipantService,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      email,
    });
  }

  async toggleCollection(id: Types.ObjectId, collectionId: Types.ObjectId) {
    const user = await this.userModel.findById(id);

    const isCollectionSaved = user.savedCollections.some(
      (savedCollectionId: Types.ObjectId) =>
        savedCollectionId.equals(collectionId),
    );

    const updateOperation = isCollectionSaved
      ? { $pull: { savedCollections: collectionId } }
      : { $addToSet: { savedCollections: collectionId } };

    return this.userModel.findByIdAndUpdate(id, updateOperation);
  }

  async getCollectionsByUserId(id: Types.ObjectId, take: number, skip: number) {
    const pTake = isNaN(take) || !take || take < 0 ? 15 : take;
    const pSkip = isNaN(skip) || !skip || skip < 0 ? 0 : skip;
    return this.participantService.getParticipantCollections(id, pTake, pSkip);
  }
}
