import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export function ToObjectId(options: { each?: boolean; message?: string } = {}) {
  const { each = false, message } = options;

  return function (target: Object, propertyName: string) {
    Transform(({ value }) => {
      if (each) {
        if (Array.isArray(value)) {
          return value.map((item) => {
            if (Types.ObjectId.isValid(item)) {
              return new Types.ObjectId(item);
            }
            throw new BadRequestException(
              message || `${propertyName} should be ObjectId`,
            );
          });
        }
        throw new BadRequestException(`Expected an array for ${propertyName}`);
      } else {
        if (Types.ObjectId.isValid(value)) {
          return new Types.ObjectId(value);
        }
        throw new BadRequestException(
          message || `${propertyName} should be ObjectId`,
        );
      }
    })(target, propertyName);
  };
}
