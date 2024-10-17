import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { UserModule } from './modules/UserModule';
import { CollectionModule } from './modules/CollectionModule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CollectionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
