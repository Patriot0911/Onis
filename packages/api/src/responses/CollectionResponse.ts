import { Status } from '../schemas/CollectionSchema';

export class CollectionResponse {
  id: string;
  title: string;
  participants: string[];
  status: Status;
  createdAt: Date;
}

export class CollectionsResponse {
  collections: CollectionResponse[];
}
