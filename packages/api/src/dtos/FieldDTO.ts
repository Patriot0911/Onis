import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'src/schemas/FieldSchema';

export class FieldDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @IsOptional()
  @IsBoolean()
  isArray?: boolean;
}
