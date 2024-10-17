import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { User } from '../../schemas/UserSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    return req?.cookies?.userToken;
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userModel.findById(payload.sub);

    delete user.password;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
