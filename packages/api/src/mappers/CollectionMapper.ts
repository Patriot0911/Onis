import { Collection } from '../schemas/CollectionSchema';
import {
  CollectionResponse,
  CollectionsResponse,
} from '../responses/CollectionResponse';

export class CollectionMapper {
  static getCollectionResponse(collection: Collection): CollectionResponse {
    return {
      id: collection.id,
      title: collection.title,
      participants: collection.participants,
      status: collection.status,
      createdAt: collection.createdAt,
    };
  }

  static getCollectionResponses(
    collections: Collection[],
  ): CollectionsResponse {
    return {
      collections: collections.map(CollectionMapper.getCollectionResponse),
    };
  }
}
