import { IsString } from 'class-validator';

export class CreatePretestDto {
  @IsString()
  question: string;
  @IsString({ each: true })
  options: string[];
  @IsString()
  correctAnswer: string;
}
