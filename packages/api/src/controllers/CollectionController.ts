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
    @Param('collectionId', ObjectIdPipe) collectionId: string,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.get(collectionId);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Access('collections.$collectionId.update')
  @Patch(':collectionId')
  async update(
    @Param('collectionId', ObjectIdPipe) collctionId: Types.ObjectId,
    @Body() body: UpdateCollectionDTO,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.update(collctionId, body);
    return CollectionMapper.getCollectionResponse(collection);
  }

  @Access('collections.$collectionId.fields.change')
  @Patch(':collectionId/fields')
  async ChangeFields(
    @Param('collectionId', ObjectIdPipe) collectionId: Types.ObjectId,
    @Body() body: ChangeFieldsDTO,
  ) {
    return this.collectionService.changeFields(collectionId, body);
  }
}
