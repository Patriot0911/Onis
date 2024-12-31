import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { CollectionByIdPipe } from '../utils/pipes/CollectionByIdPipe';
import { Access } from '../utils/security/Access';
import { Types } from 'mongoose';
import { UserRequest } from '../utils/security/UserRequest';
import { User } from '../schemas/UserSchema';
import { CollectionsResponse } from '../responses/CollectionResponse';
import { CollectionMapper } from '../mappers/CollectionMapper';
import { UserData } from '../data/UserData';

const maxTake = 100;

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Access()
  @Post('collections/:collectionId/toggle')
  async toggleCollection(
    @UserRequest() user: User,
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
  ): Promise<void> {
    await this.userService.toggleCollection(user.id, collectionId);
  }

  @Access()
  @Get('collections/me')
  async getAllCollections(
    @UserRequest() user: UserData,
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
  ): Promise<CollectionsResponse> {
    const collections = await this.userService.getCollectionsByUserId(user._id, take > maxTake ? maxTake : take, skip);
    return CollectionMapper.getCollectionResponses(collections);
  }
}
