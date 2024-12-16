import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateField } from 'src/dtos/ChangeFieldsDTO';
import { FieldDTO } from 'src/dtos/FieldDTO';
import { Field } from 'src/schemas/FieldSchema';

@Injectable()
export class FieldService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  async updateFields(fields: UpdateField[]): Promise<void> {
    fields.forEach(({ id, data }) => this.update(id, data));
  }

  async update(id: Types.ObjectId, data: FieldDTO): Promise<Field> {
    return this.fieldModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFields(ids: Types.ObjectId[]) {
    return this.fieldModel.deleteMany({
      _id: { $in: ids },
    });
  }

  async createFields(fields: FieldDTO[]) {
    return this.fieldModel.insertMany(fields);
  }
}
