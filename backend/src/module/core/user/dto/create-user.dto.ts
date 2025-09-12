import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string;

  @IsEmail()
  email: string;
}
