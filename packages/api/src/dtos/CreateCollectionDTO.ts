import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
