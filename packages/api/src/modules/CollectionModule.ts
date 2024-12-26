import { Module } from '@nestjs/common';
import { CollectionController } from '../controllers/CollectionController';
import { CollectionService } from '../services/CollectionService';
import { FieldService } from '../services/FieldService';
import { MongoModule } from './MongoModule';
import { ParticipantModule } from './ParticipantModule';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, FieldService],
  imports: [MongoModule, ParticipantModule],
  exports: [CollectionService, FieldService],
})
export class CollectionModule {}
