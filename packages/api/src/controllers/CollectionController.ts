import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CollectionService } from '../services/CollectionService';
import { UserRequest } from '../utils/security/UserRequest';
import { User } from '../schemas/UserSchema';
import { Access } from '../utils/security/Access';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { CollectionMapper } from '../mappers/CollectionMapper';
import {
  CollectionResponse,
  CollectionsResponse,
} from '../responses/CollectionResponse';
import { UpdateCollectionDTO } from 'src/dtos/UpdateCollectionDTO';
import { CollectionByIdPipe } from '../utils/pipes/CollectionByIdPipe';
import { Types } from 'mongoose';
import { ChangeFieldsDTO } from 'src/dtos/ChangeFieldsDTO';

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
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.get(collectionId);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Access('collections.$collectionId.update')
  @Patch(':collectionId')
  async update(
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
    @Body() body: UpdateCollectionDTO,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.update(collectionId, body);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Access('collections.$collectionId.fields.change')
  @Patch(':collectionId/fields')
  async ChangeFields(
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
    @Body() body: ChangeFieldsDTO,
  ): Promise<void> {
    return this.collectionService.changeFields(collectionId, body);
  }
}
