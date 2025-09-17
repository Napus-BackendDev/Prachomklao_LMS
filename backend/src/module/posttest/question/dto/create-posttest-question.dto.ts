import { IsString } from 'class-validator';

export class CreatePosttestQuestionDto {
  @IsString()
  question: string;
  @IsString({ each: true })
  options: string[];
  @IsString()
  correctAnswer: string;
  @IsString()
  explanation : string;
}
