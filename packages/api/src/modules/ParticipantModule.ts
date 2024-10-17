import { Module } from '@nestjs/common';
import { MongoModule } from './MongoModule';
import { ParticipantService } from '../services/ParticipantService';

@Module({
  providers: [ParticipantService],
  imports: [MongoModule],
  exports: [ParticipantService],
})
export class ParticipantModule {}
