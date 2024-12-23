import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { ToObjectId } from 'src/utils/decorators/toObjectId';

export class AnswerDTO {
  @IsNotEmpty()
  @ToObjectId()
  fieldId: Types.ObjectId;

  @IsNotEmpty()
  value: any;
}
