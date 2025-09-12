import { IsString } from 'class-validator';

export class CreatePretestAnswerDto {
  @IsString()
  question: string;
  @IsString()
  answer: string;
}
