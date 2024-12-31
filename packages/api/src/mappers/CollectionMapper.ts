import { Collection } from '../schemas/CollectionSchema';
import { CollectionsResponse } from '../responses/CollectionResponse';

export class CollectionMapper {
  static getCollectionResponse(collection: any): any {
    return {
      id: collection._id,
      title: collection.title,
      description: collection.description,
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

  static getExtendedCollectionResponse(collection: Collection) {
    return {
      id: collection._id,
      title: collection.title,
      description: collection.description,
      image: collection.image,
      participants: collection.participants,
      createdAt: collection.createdAt,
    };
  }
}
