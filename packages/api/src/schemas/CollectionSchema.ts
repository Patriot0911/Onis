import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

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
    default: Date.now(),
  })
  createdAt: Date;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Field',
    default: [],
  })
  fields: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'Response',
    default: [],
  })
  responses: Response[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
