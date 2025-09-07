import { IsString } from 'class-validator';

export class CreatePosttestAnswerDto {
  @IsString()
  question: string;
  @IsString()
  answer: string;
}
