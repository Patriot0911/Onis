import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/MongoModule';
import { AuthModule } from './modules/AuthModule';
import { UserModule } from './modules/UserModule';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
