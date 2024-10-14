import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './modules/MongoModule';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
