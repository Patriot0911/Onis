import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection } from './CollectionSchema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Collection' })
  collections: Collection[];
}

export const UserSchema = SchemaFactory.createForClass(User);
