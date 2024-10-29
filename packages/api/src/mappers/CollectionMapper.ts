import { Collection } from '../schemas/CollectionSchema';
import {
  CollectionResponse,
  CollectionResponses,
} from '../responses/CollectionResponse';

export class CollectionMapper {
  static getCollectionResponse(collection: Collection): CollectionResponse {
    return {
      id: collection.id,
      title: collection.title,
      participants: collection.participants as unknown as string[],
      status: collection.status,
      createdAt: collection.createdAt,
    };
  }

  static getCollectionResponses(
    collections: Collection[],
  ): CollectionResponses {
    return {
      collections: collections.map(CollectionMapper.getCollectionResponse),
    };
  }
}
