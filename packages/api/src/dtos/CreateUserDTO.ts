import { IsString, IsOptional, IsUrl } from 'class-validator';
import { LoginDTO } from './LoginDTO';

export class CreateUserDTO extends LoginDTO {
  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  avatar: string = '';
}
