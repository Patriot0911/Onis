import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CollectionService } from '../services/CollectionService';
import { UserRequest } from '../utils/security/UserRequest';
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
import { UserData } from 'src/data/UserData';
import { FieldMapper } from 'src/mappers/FieldMapper';
import { FieldResponse } from 'src/responses/FieldsResponse';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Access()
  @Post()
  async create(
    @Body() body: CreateCollectionDTO,
    @UserRequest() user: UserData,
  ): Promise<CollectionResponse> {
    const collection = await this.collectionService.create(body, user._id);
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
  ): Promise<FieldResponse[]> {
    await this.collectionService.changeFields(collectionId, body);
    const fields =
      await this.collectionService.getCollectionFields(collectionId);
    return FieldMapper.getFields(fields);
  }

  @Access('collections.$collectionId.fields.get')
  @Get(':collectionId/fields')
  async getFields(
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
  ): Promise<FieldResponse[]> {
    const fields =
      await this.collectionService.getCollectionFields(collectionId);
    return FieldMapper.getFields(fields);
  }
}
