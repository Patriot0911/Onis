import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from '../schemas/CollectionSchema';
import { Participant, RoleName } from '../schemas/ParticipantSchema';
import { Grants } from './ParticipantService';
import { Model, Types } from 'mongoose';
import { UpdateCollectionDTO } from 'src/dtos/UpdateCollectionDTO';
import { ChangeFieldsDTO, UpdateField } from 'src/dtos/ChangeFieldsDTO';
import { FieldService } from './FieldService';
import { FieldDTO } from 'src/dtos/FieldDTO';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
    @InjectModel(Participant.name)
    private readonly participantModel: Model<Participant>,
    private readonly fieldService: FieldService,
  ) {}

  async create(
    data: CreateCollectionDTO,
    userId: Types.ObjectId,
  ): Promise<Collection> {
    const collection = new this.collectionModel(data);

    const participant = new this.participantModel({
      user: userId,
      collect: collection._id,
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

  async get(id: Types.ObjectId): Promise<Collection> {
    return this.collectionModel.findOne({ _id: id });
  }

  async update(
    id: Types.ObjectId,
    data: UpdateCollectionDTO,
  ): Promise<Collection> {
    return this.collectionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async changeFields(
    collectionId: Types.ObjectId,
    body: ChangeFieldsDTO,
  ): Promise<void> {
    await this.updateFields(collectionId, body.update);
    await this.deleteFields(collectionId, body.delete);
    await this.createFields(collectionId, body.create);
  }

  async updateFields(collectionId: Types.ObjectId, data: UpdateField[]) {
    const fieldsIds = data.map((field) => field.id);
    await this.validateFields(collectionId, fieldsIds);
    await this.fieldService.updateFields(data);
  }

  async deleteFields(
    collectionId: Types.ObjectId,
    fieldsIds: Types.ObjectId[],
  ): Promise<void> {
    await this.validateFields(collectionId, fieldsIds);

    await this.fieldService.deleteFields(fieldsIds);
    this.collectionModel.updateOne(
      { _id: collectionId },
      {
        $pull: {
          fields: {
            $in: {
              fieldsIds,
            },
          },
        },
      },
    );
  }

  async createFields(
    collectionId: Types.ObjectId,
    data: FieldDTO[],
  ): Promise<void> {
    const fields = await this.fieldService.createFields(data);
    await this.collectionModel.updateOne(
      { _id: collectionId },
      {
        $push: {
          fields: {
            $each: fields.map((field) => field._id),
          },
        },
      },
    );
  }

  async validateFields(
    collectionId: Types.ObjectId,
    fieldsIds: Types.ObjectId[],
  ) {
    const { fields: collectionFieldsIds }: { fields: Types.ObjectId[] } =
      await this.collectionModel.findById(collectionId);

    for (const fieldId of fieldsIds) {
      const isFieldBelongToCollection = collectionFieldsIds.some(
        (collectionFieldId) =>
          collectionFieldId.toString() === fieldId.toString(),
      );

      if (!isFieldBelongToCollection) {
        throw new BadRequestException(
          `Field ${fieldId} does not in collection ${collectionId}}`,
        );
      }
    }
  }
}
