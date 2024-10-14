import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './UserSchema';
import { Collection } from './CollectionSchema';
import mongoose from 'mongoose';

enum RoleName {
  OWNER,
  MODERATOR,
}

@Schema()
export class Participant extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' })
  collection: Collection;

  @Prop()
  roleName: RoleName;

  @Prop()
  grants: string[];
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
