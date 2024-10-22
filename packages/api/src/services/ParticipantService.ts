import { Injectable } from '@nestjs/common';
import { Participant } from '../schemas/ParticipantSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export const Grants = {
  all: (collectionId) => `collections.${collectionId}.*`,
};

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const roles = await this.participantModel.find({
      user: userId,
    });
    return this.hasPermissionInRoles(roles, permission);
  }

  async hasPermissionInRoles(
    roles: Participant[],
    permission: string,
  ): Promise<boolean> {
    const grants: string[] = [];

    roles.forEach((role) => grants.push(...role.grants));

    for (const grant of grants) {
      const havePermission = this.isGrantMatchesPermission(permission, grant);
      if (havePermission) return true;
    }

    return false;
  }

  isGrantMatchesPermission(permission: string, grant: string): boolean {
    const parts = permission.split('.');
    const grantParts = grant.split('.');

    if (grantParts.length > parts.length) return false;

    for (let i = 0; i < parts.length; i++) {
      const part = grantParts[i];
      if (part === '*') {
        if (i === grantParts.length - 1) {
          return true;
        }
      } else if (part !== parts[i]) {
        return false;
      }
    }

    return true;
  }
}