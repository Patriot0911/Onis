import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDTO {
  @IsNotEmpty({ message: 'Login cannot be empty' })
  @IsString({ message: 'Login must be a string' })
  emailOrUserName: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
