import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Participant } from './ParticipantSchema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Collection extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  participants: Participant[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
