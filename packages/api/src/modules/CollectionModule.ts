import { Module } from '@nestjs/common';
import { CollectionController } from '../controllers/CollectionController';
import { CollectionService } from '../services/CollectionService';
import { MongoModule } from './MongoModule';
import { ParticipantModule } from './ParticipantModule';
import { FieldService } from 'src/services/FieldService';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, FieldService],
  imports: [MongoModule, ParticipantModule],
  exports: [CollectionService, FieldService],
})
export class CollectionModule {}
