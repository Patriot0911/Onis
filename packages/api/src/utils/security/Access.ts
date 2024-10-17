import { applyDecorators, UseGuards } from '@nestjs/common';
import { Permissions } from './Permissions';
import { JwtGuard } from './JwtGuard';
import { PermissionGuard } from './PermissionGuard';

export function Access(permission?: string, ...guards: any[]) {
  permission && guards.push(PermissionGuard);

  return applyDecorators(
    Permissions(permission),
    UseGuards(JwtGuard, ...guards),
  );
}
