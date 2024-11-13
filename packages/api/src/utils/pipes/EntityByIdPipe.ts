import { PipeTransform, Injectable } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export abstract class EntityByIdPipe<T>
  implements PipeTransform<string, Promise<string>>
{
  protected constructor(private readonly entityModel: Model<T>) {}

  async transform(id: string): Promise<string> {
    if (!isValidObjectId(id)) {
      throw new InvalidEntityIdException(this.entityModel.modelName);
    }

    const entity = await this.entityModel.findById(id);
    if (!entity) {
      throw new InvalidEntityIdException(this.entityModel.modelName);
    }
    return id;
  }
}
