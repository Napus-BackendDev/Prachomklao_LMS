import { PartialType } from '@nestjs/mapped-types';
import { CreatePosttestQuestionDto } from './create-posttest-question.dto';

export class UpdatePosttestQuestionDto extends PartialType(CreatePosttestQuestionDto) {}
