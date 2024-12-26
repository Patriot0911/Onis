import { Module } from '@nestjs/common';
import { CollectionController } from '../controllers/CollectionController';
import { CollectionService } from '../services/CollectionService';
import { FieldService } from '../services/FieldService';
import { MongoModule } from './MongoModule';
import { ParticipantModule } from './ParticipantModule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, FieldService],
  imports: [
    MongoModule,
    ParticipantModule,
    CacheModule.register({
      ttl: 3,
    }),
  ],
  exports: [CollectionService, FieldService],
})
export class CollectionModule {}
