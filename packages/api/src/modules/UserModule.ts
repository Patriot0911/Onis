import { Module } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { MongoModule } from './MongoModule';
import { UsersController } from '../controllers/UserContoller';
import { ParticipantModule } from './ParticipantModule';

@Module({
  controllers: [UsersController],
  imports: [MongoModule, ParticipantModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
