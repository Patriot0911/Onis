import { PipeTransform, Injectable } from '@nestjs/common';
import { isValidObjectId, Model, Types } from 'mongoose';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export abstract class EntityByIdPipe<T>
  implements PipeTransform<string, Promise<Types.ObjectId>>
{
  protected constructor(private readonly entityModel: Model<T>) {}

  async transform(id: string): Promise<Types.ObjectId> {
    if (!isValidObjectId(id)) {
      throw new InvalidEntityIdException(this.entityModel.modelName);
    }

    const objectId = new Types.ObjectId(id);

    const entity = await this.entityModel.findById(objectId);
    if (!entity) {
      throw new InvalidEntityIdException(this.entityModel.modelName);
    }
    return objectId;
  }
}
