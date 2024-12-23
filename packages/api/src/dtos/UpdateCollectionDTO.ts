import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
