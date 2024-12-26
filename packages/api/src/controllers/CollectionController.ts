import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserData } from '../data/UserData';
import { ChangeFieldsDTO } from '../dtos/ChangeFieldsDTO';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';
import { CreateResponseDTO } from '../dtos/CreateResponseDTO';
import { UpdateCollectionDTO } from '../dtos/UpdateCollectionDTO';
import { CollectionMapper } from '../mappers/CollectionMapper';
import { FieldMapper } from '../mappers/FieldMapper';
import { CollectionResponse } from '../responses/CollectionResponse';
import { FieldResponse } from '../responses/FieldsResponse';
import { CollectionService } from '../services/CollectionService';
import { CollectionByIdPipe } from '../utils/pipes/CollectionByIdPipe';
import { Access } from '../utils/security/Access';
import { UserRequest } from '../utils/security/UserRequest';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('collections')
@UseInterceptors(CacheInterceptor)
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

  @Access('collections.$collectionId.get')
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

  @Access('collections.$collectionId.response.fill')
  @Post(':collectionId/response')
  async collectionResponse(
    @UserRequest() user: UserData,
    @Param('collectionId', CollectionByIdPipe) collectionId: Types.ObjectId,
    @Body() body: CreateResponseDTO,
  ) {
    return this.collectionService.fillCollection(user._id, collectionId, body);
  }
}
