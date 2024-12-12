import { Status } from '../schemas/CollectionSchema';
import { Participant } from '../schemas/ParticipantSchema';

export class CollectionResponse {
  id: string;
  title: string;
  participants: Participant[];
  status: Status;
  createdAt: Date;
}

export class CollectionsResponse {
  collections: CollectionResponse[];
}
