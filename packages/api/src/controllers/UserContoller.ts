import { Controller, Delete, Param, Post } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserByIdPipe } from '../utils/pipes/UserByIdPipe';
import { CollectionByIdPipe } from '../utils/pipes/CollectionByIdPipe';
import { Access } from '../utils/security/Access';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Access()
  @Post(':userId/collections/:collectionId/save')
  saveCollection(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('collectionId', CollectionByIdPipe) collectionId: string,
  ): void {
    this.userService.saveCollection(userId, collectionId);
  }

  @Access()
  @Delete(':userId/collections/:collectionId/remove')
  removeCollection(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('collectionId', CollectionByIdPipe) collectionId: string,
  ): void {
    this.userService.removeCollection(userId, collectionId);
  }
}
