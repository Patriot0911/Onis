import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection } from './CollectionSchema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Collection',
    default: [],
  })
  collections: Collection[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Collection',
    default: [],
  })
  savedCollection: Collection[];
}

export const UserSchema = SchemaFactory.createForClass(User);
