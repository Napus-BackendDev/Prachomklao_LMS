import { IsString } from 'class-validator';

export class CreatePosttestDto {
  @IsString()
  question: string;
  @IsString({ each: true })
  options: string[];
  @IsString()
  correctAnswer: string;
}
