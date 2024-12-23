import { Module } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { MongoModule } from './MongoModule';
import { UsersController } from '../controllers/UserContoller';
import { CollectionModule } from './CollectionModule';

@Module({
  controllers: [UsersController],
  imports: [MongoModule, CollectionModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
