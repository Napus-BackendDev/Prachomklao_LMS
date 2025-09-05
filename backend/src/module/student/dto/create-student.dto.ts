import { IsString } from "class-validator";

export class CreateStudentDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}
