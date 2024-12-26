import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChangeFieldsDTO, UpdateField } from '../dtos/ChangeFieldsDTO';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { CreateResponseDTO } from '../dtos/CreateResponseDTO';
import { FieldDTO } from '../dtos/FieldDTO';
import { AnswerDTO } from '../dtos/ResponseDTO';
import { UpdateCollectionDTO } from '../dtos/UpdateCollectionDTO';
import { Answer } from '../schemas/AnswerSchema';
import { Collection } from '../schemas/CollectionSchema';
import { Field } from '../schemas/FieldSchema';
import { Participant, RoleName } from '../schemas/ParticipantSchema';
import { Response } from '../schemas/ResponseSchema';
import { FieldService } from './FieldService';
import { Grants } from './ParticipantService';

const compareTypes = {
  string: (value: any): boolean => typeof value === 'string',
  number: (value: any): boolean => typeof value === 'number',
  boolean: (value: any): boolean => typeof value === 'boolean',
  date: (value: any): boolean => !isNaN(new Date(value).getTime()),
};

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
    @InjectModel(Field.name)
    private readonly fieldModel: Model<Field>,
    @InjectModel(Participant.name)
    private readonly participantModel: Model<Participant>,
    @InjectModel(Response.name)
    private readonly responseModel: Model<Response>,
    @InjectModel(Answer.name)
    private readonly answerModel: Model<Answer>,
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
      grants: [Grants.all(collection._id)],
    });

    await participant.save();

    collection.participants.push(participant.id);
    return collection.save();
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
    await Promise.all([
      this.updateFields(collectionId, body.update),
      this.deleteFields(collectionId, body.delete),
      this.createFields(collectionId, body.create),
    ]);
  }

  async updateFields(collectionId: Types.ObjectId, data: UpdateField[]) {
    const fieldsIds = data.map((field) => field.id);
    const fields = data.map((field) => field.data);
    this.validateFieldOptions(fields);
    await Promise.all([
      this.checkIsFieldsBelongsToCollection(collectionId, fieldsIds),
      this.fieldService.updateFields(data),
    ]);
  }

  async deleteFields(
    collectionId: Types.ObjectId,
    fieldsIds: Types.ObjectId[],
  ): Promise<void> {
    await this.checkIsFieldsBelongsToCollection(collectionId, fieldsIds);

    await Promise.all([
      this.fieldService.deleteFields(fieldsIds),
      this.collectionModel.updateOne(
        { _id: collectionId },
        {
          $pull: {
            fields: {
              $in: fieldsIds,
            },
          },
        },
      ),
    ]);
  }

  async createFields(
    collectionId: Types.ObjectId,
    data: FieldDTO[],
  ): Promise<void> {
    this.validateFieldOptions(data);
    const fieldsData = data.map((field) => ({
      collect: collectionId,
      ...field,
    }));
    const fields = await this.fieldService.createFields(fieldsData);
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

  async checkIsFieldsBelongsToCollection(
    collectionId: Types.ObjectId,
    fieldsIds: Types.ObjectId[],
  ) {
    const { fields: collectionFieldsIds } =
      await this.collectionModel.findById(collectionId);

    for (const fieldId of fieldsIds) {
      const isFieldBelongToCollection = collectionFieldsIds.some(
        (collectionFieldId) =>
          collectionFieldId.toString() === fieldId.toString(),
      );

      if (!isFieldBelongToCollection) {
        throw new BadRequestException(
          `Field ${fieldId} does not in collection ${collectionId}`,
        );
      }
    }
  }

  async getCollectionFields(collectionId: Types.ObjectId) {
    return this.fieldModel.find({
      collect: collectionId,
    });
  }

  private validateFieldOptions(fields: FieldDTO[]) {
    fields.forEach((field) => {
      if (!field.options) return;

      const isOptionsValid = field.options.every((option) =>
        compareTypes[field.type](option),
      );
      if (!isOptionsValid)
        throw new BadRequestException(`All options should be ${field.type}`);
    });
  }

  async fillCollection(
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
    { answers }: CreateResponseDTO,
  ) {
    await this.validateAnswers(collectionId, answers);
    await this.saveResponse(userId, collectionId, answers);
  }

  async saveResponse(
    userId: Types.ObjectId,
    collectionId: Types.ObjectId,
    answers: AnswerDTO[],
  ) {
    const response = new this.responseModel({
      user: userId,
      collect: collectionId,
    });

    for (const data of answers) {
      const answer = new this.answerModel({
        value: data.value,
        field: data.fieldId,
        response: response._id,
      });

      await answer.save();

      response.answers.push(answer.id);
    }

    await response.save();
  }

  async validateAnswers(collectionId: Types.ObjectId, answers: AnswerDTO[]) {
    const { fields } = await this.collectionModel
      .findById(collectionId)
      .populate<{ fields: Field[] }>({
        path: 'fields',
      });

    const usedAnswers = [];

    if (answers.length > fields.length)
      throw new BadRequestException('Answers more than fields');

    for (const field of fields) {
      const fieldAnswer = answers.find(
        (answer) => answer.fieldId.toString() === field._id.toString(),
      );
      if (field.isRequired && !fieldAnswer)
        throw new BadRequestException(`Field ${field.name} is required`);
      if (!fieldAnswer) continue;
      usedAnswers.push(fieldAnswer.fieldId);

      field.isArray
        ? this.validateAnswerArray(field, fieldAnswer)
        : this.validateAnswer(field, fieldAnswer.value);
    }

    if (usedAnswers.length !== answers.length)
      throw new BadRequestException('One is this fields ids out of collection');
  }

  private validateAnswer(field: Field, answer: any) {
    if (!compareTypes[field.type](answer))
      throw new BadRequestException(
        `Type for field ${field.name} should be a ${field.type}`,
      );
    if (field.options && !field.options.find((option) => option === answer))
      throw new BadRequestException(
        `Field ${field.name} should be in options ${field.options}`,
      );
  }

  private validateAnswerArray(field: Field, answer: AnswerDTO) {
    if (!Array.isArray(answer.value))
      throw new BadRequestException(`Field ${field.name} should be an array`);
    answer.value.forEach((value) => this.validateAnswer(field, value));
  }
}
