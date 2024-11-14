import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CollectionService } from '../services/CollectionService';
import { UserRequest } from '../utils/security/UserRequest';
import { User } from '../schemas/UserSchema';
import { Access } from '../utils/security/Access';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { ObjectIdPipe } from '../utils/pipes/ObjectIdPipe';
import { CollectionMapper } from '../mappers/CollectionMapper';
import {
  CollectionResponse,
  CollectionsResponse,
} from '../responses/CollectionResponse';
import { UpdateCollectionDTO } from 'src/dtos/UpdateCollectionDTO';
import mongoose from 'mongoose';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Access()
  @Post()
  async create(
    @Body() body: CreateCollectionDTO,
    @UserRequest() user: User,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.create(body, user.id);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Get()
  async getAll(): Promise<CollectionsResponse> {
    const collections = await this.collectionService.getAll();
    return CollectionMapper.getCollectionResponses(collections);
  }

  @Get(':collectionId')
  async get(
    @Param('collectionId', ObjectIdPipe) collectionId: string,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.get(collectionId);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Access('collections.$collectionId.update')
  @Patch(':collectionId')
  async update(
    @Param('collectionId', ObjectIdPipe) collctionId: mongoose.Types.ObjectId,
    @Body() body: UpdateCollectionDTO,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.update(collctionId, body);
    return CollectionMapper.getCollectionResponse(collection);
  }
}
