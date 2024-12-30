import { User } from '../schemas/UserSchema';
import { UserResponse } from '../responses/UserResponse';

export class UserMapper {
  static getUserResponse(user: User): UserResponse {
    return {
      username: user.username,
      avatar: user.avatar,
    };
  }
}
