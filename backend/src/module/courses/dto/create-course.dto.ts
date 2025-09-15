import { IsOptional, isString, IsString } from 'class-validator';

export class CreateCourseDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  courseCode?: string;
  
  @IsString()
  url: string;
  
}
