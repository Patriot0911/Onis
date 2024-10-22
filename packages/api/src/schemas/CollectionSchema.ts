import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Participant } from './ParticipantSchema';
import mongoose, { Document } from 'mongoose';

export enum Status {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  CLOSE = 'CLOSE',
}

@Schema()
export class Collection extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  participants: Participant[];

  @Prop({
    default: Status.DRAFT,
  })
  status: Status;

  @Prop({
    default: Date.now(),
  })
  createdAt: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
