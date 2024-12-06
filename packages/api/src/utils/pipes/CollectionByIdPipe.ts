import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityByIdPipe } from './EntityByIdPipe';
import { Collection } from '../../schemas/CollectionSchema';

@Injectable()
export class CollectionByIdPipe extends EntityByIdPipe<Collection> {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
  ) {
    super(collectionModel);
  }
}
