import { Module } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { MongoModule } from './MongoModule';

@Module({
  imports: [MongoModule],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
