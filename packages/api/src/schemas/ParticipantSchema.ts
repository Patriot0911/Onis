import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum RoleName {
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
}

@Schema()
export class Participant extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Collection', required: true })
  collect: Types.ObjectId;

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
