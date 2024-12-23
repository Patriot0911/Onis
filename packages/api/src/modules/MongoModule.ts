import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/UserSchema';
import { ConfigService } from '@nestjs/config';
import { Participant, ParticipantSchema } from '../schemas/ParticipantSchema';
import { Collection, CollectionSchema } from '../schemas/CollectionSchema';
import { Field, FieldSchema } from 'src/schemas/FieldSchema';
import { Response, ResponseSchema } from 'src/schemas/ResponseSchema';
import { Answer, AnswerSchema } from 'src/schemas/AnswerSchema';

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
