import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../utils/security/JwtStrategy';
import { AuthController } from '../controllers/AuthController';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../services/AuthService';
import { UserModule } from './UserModule';
import { MongoModule } from './MongoModule';
import { ParticipantModule } from './ParticipantModule';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: configService.get<number>('JWT_EXPIRES') },
      }),
      inject: [ConfigService],
    }),
    ParticipantModule,
    UserModule,
    MongoModule,
  ],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
