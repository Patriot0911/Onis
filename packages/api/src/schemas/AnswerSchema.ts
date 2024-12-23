import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Response', required: true })
  response: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Field', required: true })
  field: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed })
  value: any;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
