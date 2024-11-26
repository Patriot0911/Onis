import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { FieldDTO } from './FieldDTO';
import { ToObjectId } from 'src/utils/decorators/toObjectId';

export class UpdateField {
  @IsNotEmpty()
  @ToObjectId()
  id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => FieldDTO)
  data: FieldDTO;
}

export class ChangeFieldsDTO {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDTO)
  create: FieldDTO[] = [];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateField)
  update: UpdateField[] = [];

  @IsOptional()
  @IsArray()
  @ToObjectId({ each: true })
  delete: Types.ObjectId[] = [];
}
