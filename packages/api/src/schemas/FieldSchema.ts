import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Type {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

@Schema()
export class Field extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: true,
    enum: Type,
  })
  type: Type;

  @Prop({
    required: false,
    default: false,
  })
  isArray: boolean;

  @Prop({
    required: false,
    default: false,
  })
  isRequired: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Collection', required: true })
  collect: Types.ObjectId;

  @Prop({ type: Array, required: false, default: null })
  options: string[] | number[] | boolean[] | Date[];
}

export const FieldSchema = SchemaFactory.createForClass(Field);
