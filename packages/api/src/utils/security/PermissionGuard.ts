import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { NoPermissionException } from '../exceptions/NoPermissionException';
import { ParticipantService } from '../../services/ParticipantService';
import { User } from '../../schemas/UserSchema';
import { UserData } from 'src/data/UserData';

@Injectable()
export class PermissionGuard implements CanActivate {
  private request: Request;

  constructor(
    private readonly roleService: ParticipantService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    this.request = context.switchToHttp().getRequest<Request>();
    const user = this.request.user as UserData;
    const permission = this.getPermission(context);

    const hasPermission = await this.roleService.hasPermission(
      user._id,
      permission,
    );

    if (!hasPermission) throw new NoPermissionException();
    return true;
  }

  private getPermission(context: ExecutionContext): string {
    const permission = this.reflector.get('permission', context.getHandler());
    return permission
      .split('.')
      .map((part) => this.getPart(part))
      .join('.');
  }

  private getPart(part: string): string {
    if (part.startsWith('$')) {
      const newPart = this.getPartFromRequest(this.request, part.slice(1));
      if (!newPart) {
        throw new NoPermissionException();
      }
      return newPart;
    }

    return part;
  }

  private getPartFromRequest(req: Request, value: string) {
    return req.query[value] ?? req.params[value] ?? req.body[value] ?? '';
  }
}
