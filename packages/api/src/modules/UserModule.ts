import { Module } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { MongoModule } from './MongoModule';
import { UsersController } from '../controllers/UserContoller';

@Module({
  controllers: [UsersController],
  imports: [MongoModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
