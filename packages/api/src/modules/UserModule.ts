import { Module } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { MongoModule } from './MongoModule';

@Module({
  imports: [MongoModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
