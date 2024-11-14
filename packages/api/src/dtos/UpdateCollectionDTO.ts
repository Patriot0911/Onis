import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/schemas/CollectionSchema';

export class UpdateCollectionDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
