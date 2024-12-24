import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class Response extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Collection', required: true })
  collect: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Answer', required: true })
  answers: Types.ObjectId[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
