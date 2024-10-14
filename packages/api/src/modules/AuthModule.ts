import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../security/JwtStrategy';
import { AuthController } from '../controllers/AuthController';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../services/UserService';
import { User } from '../schemas/UserSchema';
import { MongoModule } from './MongoModule';
import { AuthService } from '../services/AuthService';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    MongoModule,
  ],
  providers: [JwtStrategy, UserService, AuthService],
})
export class AuthModule {}
