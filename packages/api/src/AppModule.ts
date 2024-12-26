import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { UserModule } from './modules/UserModule';
import { CollectionModule } from './modules/CollectionModule';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CollectionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          blockDuration: 5,
          ttl: 10,
          limit: 200,
        },
      ],
    }),
  ],
})
export class AppModule {}
