import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

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

  @Prop({
    required: false,
    default: null,
  })
  image: string;

  @Prop({ type: [Types.ObjectId], ref: 'Participant' })
  participants: Types.ObjectId[];

  @Prop({
    enum: Status,
    default: Status.DRAFT,
  })
  status: Status;

  @Prop({
    default: Date.now(),
  })
  createdAt: Date;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Field',
    default: [],
  })
  fields: Types.ObjectId[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
