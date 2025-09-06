import { IsString } from 'class-validator';

export class CreatePretestQuestionDto {
  @IsString()
  question: string;
  @IsString({ each: true })
  options: string[];
  @IsString()
  correctAnswer: string;
}
