import { PipeTransform } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

export class ObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(id: string): Types.ObjectId {
    if (!isValidObjectId(id)) {
      throw new InvalidEntityIdException('Entity');
    }
    return new Types.ObjectId(id);
  }
}
