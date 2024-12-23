import { Participant } from '../schemas/ParticipantSchema';
import { Collection } from '../schemas/CollectionSchema';

export type ParticipantWithCollection = Participant & { collect: Collection };
