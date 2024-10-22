import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { LoginDTO } from './LoginDTO';

export class CreateUserDTO extends LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
