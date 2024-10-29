import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from '../schemas/CollectionSchema';
import { Participant, RoleName } from '../schemas/ParticipantSchema';
import { Grants } from './ParticipantService';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async create(
    data: CreateCollectionDTO,
    userId: mongoose.Types.ObjectId,
  ): Promise<Collection> {
    const collection = new this.collectionModel(data);

    const participant = new this.participantModel({
      user: userId,
      collect: collection.id,
      roleName: RoleName.OWNER,
      grants: [Grants.all(collection.id)],
    });

    await participant.save();

    collection.participants.push(participant.id);
    return collection.save();
  }

  async getAll(): Promise<Collection[]> {
    return this.collectionModel.find();
  }

  async get(id: string): Promise<Collection> {
    return this.collectionModel.findOne({ _id: id });
  }
}
