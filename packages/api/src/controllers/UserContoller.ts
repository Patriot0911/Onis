import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { CollectionByIdPipe } from '../utils/pipes/CollectionByIdPipe';
import { Access } from '../utils/security/Access';
import { Types } from 'mongoose';
import { UserRequest } from '../utils/security/UserRequest';
import { User } from '../schemas/UserSchema';
import { CollectionsResponse } from '../responses/CollectionResponse';
import { CollectionMapper } from '../mappers/CollectionMapper';
import { CollectionService } from '../services/CollectionService';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly collectionService: CollectionService,
  ) {}

  @Access()
  @Post('collections/:collectionId/toggle')
  async toggleCollection(
    @UserRequest() user: User,
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
  ): Promise<void> {
    await this.userService.toggleCollection(user.id, collectionId);
  }

  @Access()
  @Get('collections')
  async getAllCollections(
    @UserRequest() user: User,
  ): Promise<CollectionsResponse> {
    const collections = await this.collectionService.getAllByUserId(user.id);
    return CollectionMapper.getCollectionResponses(collections);
  }
}
