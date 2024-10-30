import { PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

export class ObjectIdPipe implements PipeTransform<string, string> {
  transform(id: string): string {
    if (!isValidObjectId(id)) {
      throw new InvalidEntityIdException('Entity');
    }
    return id;
  }
}
