import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from '../schemas/AnswerSchema';
import { Collection, CollectionSchema } from '../schemas/CollectionSchema';
import { Field, FieldSchema } from '../schemas/FieldSchema';
import { Participant, ParticipantSchema } from '../schemas/ParticipantSchema';
import { Response, ResponseSchema } from '../schemas/ResponseSchema';
import { User, UserSchema } from '../schemas/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Collection.name, schema: CollectionSchema },
      { name: Field.name, schema: FieldSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: Response.name, schema: ResponseSchema },
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
