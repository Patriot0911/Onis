import { User } from '../schemas/UserSchema';
import { UserResponse } from '../responses/UserResponse';

export class UserMapper {
  static getUserResponse(user: User): UserResponse {
    return {
      id: user._id as string,
      username: user.username,
      avatar: user.avatar,
    };
  }
}
