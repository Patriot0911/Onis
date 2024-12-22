import { Types } from 'mongoose';

export class UserData {
  _id: Types.ObjectId;
  email: string;
  username: string;
  avatar: string;
  collections: Types.ObjectId[];
  savedCollections: Types.ObjectId[];
}
