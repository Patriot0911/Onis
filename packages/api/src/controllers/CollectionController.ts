import { Body, Controller, Post } from '@nestjs/common';
import { CollectionService } from '../services/CollectionService';
import { UserRequest } from '../utils/security/UserRequest';
import { User } from '../schemas/UserSchema';
import { Access } from '../utils/security/Access';
import { CreateCollectionDTO } from '../dtos/CreateCollectionDTO';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Access()
  @Post()
  create(@Body() body: CreateCollectionDTO, @UserRequest() user: User) {
    return this.collectionService.create(body, user.id);
  }
}
