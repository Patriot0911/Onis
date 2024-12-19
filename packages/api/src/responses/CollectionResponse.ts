import { Types } from 'mongoose';
import { Status } from '../schemas/CollectionSchema';

export class CollectionResponse {
  id: Types.ObjectId;
  title: string;
  status: Status;
  createdAt: Date;
}

export class CollectionsResponse {
  collections: CollectionResponse[];
}
