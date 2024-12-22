import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './UserSchema';
import { Collection } from './CollectionSchema';

export enum RoleName {
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
}

@Schema()
export class Participant extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Collection', required: true })
  collect: Collection;

  @Prop({
    required: true,
    enum: RoleName,
  })
  roleName: RoleName;

  @Prop({
    default: [],
  })
  grants: string[];
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
