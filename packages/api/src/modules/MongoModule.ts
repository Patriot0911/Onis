import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/UserSchema';
import { ConfigService } from '@nestjs/config';
import { Participant, ParticipantSchema } from '../schemas/ParticipantSchema';
import { Collection, CollectionSchema } from '../schemas/CollectionSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
      { name: Collection.name, schema: CollectionSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
