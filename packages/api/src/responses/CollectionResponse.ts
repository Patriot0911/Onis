import { Types } from 'mongoose';

export class CollectionResponse {
  id: Types.ObjectId;
  title: string;
  createdAt: Date;
}

export class CollectionsResponse {
  collections: CollectionResponse[];
}
