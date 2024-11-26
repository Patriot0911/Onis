import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const FieldSchema = SchemaFactory.createForClass(Field);
