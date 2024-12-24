import { Document, Types } from 'mongoose';
import { FieldResponse } from 'src/responses/FieldsResponse';
import { Field } from 'src/schemas/FieldSchema';

export class FieldMapper {
  static getField(field: Document & Field): FieldResponse {
    return {
      id: field._id as Types.ObjectId,
      name: field.name,
      description: field.description,
      type: field.type,
      isArray: field.isArray,
      options: field.options,
      isRequired: field.isRequired,
    };
  }

  static getFields(fields: (Document & Field)[]): FieldResponse[] {
    return fields.map((field) => this.getField(field));
  }
}
