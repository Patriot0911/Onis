import { Module } from '@nestjs/common';
import { CollectionController } from '../controllers/CollectionController';
import { CollectionService } from '../services/CollectionService';
import { MongoModule } from './MongoModule';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [MongoModule],
  exports: [CollectionService],
})
export class CollectionModule {}
