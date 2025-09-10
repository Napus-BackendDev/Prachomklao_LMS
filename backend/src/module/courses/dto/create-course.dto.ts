import { IsString } from 'class-validator';

export class CreateCourseDto {

  @IsString()
  title: string;

  @IsString()
  url: string;
}
