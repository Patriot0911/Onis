import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: false,
  })
  username: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: null,
  })
  avatar: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Collection',
    default: [],
  })
  collections: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'Collection',
    default: [],
  })
  savedCollections: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'Response',
    default: [],
  })
  responses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
