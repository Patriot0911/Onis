import { Types } from 'mongoose';
import { Type } from 'src/schemas/FieldSchema';

export class FieldResponse {
  id: Types.ObjectId;
  name: string;
  description: string;
  type: Type;
  isArray: boolean;
  options: any;
  isRequired: boolean;
}
