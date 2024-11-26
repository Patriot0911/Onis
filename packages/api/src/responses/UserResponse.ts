import { Types } from 'mongoose';

export class UserResponse {
  id: Types.ObjectId;
  username: string;
  avatar: string;
}
