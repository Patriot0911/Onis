import { Module } from '@nestjs/common';
import { CollectionController } from '../controllers/CollectionController';
import { CollectionService } from '../services/CollectionService';
import { MongoModule } from './MongoModule';
import { ParticipantModule } from './ParticipantModule';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [MongoModule, ParticipantModule],
  exports: [CollectionService],
})
export class CollectionModule {}
