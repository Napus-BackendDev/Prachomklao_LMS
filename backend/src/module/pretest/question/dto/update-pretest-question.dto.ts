import { PartialType } from '@nestjs/mapped-types';
import { CreatePretestQuestionDto } from './create-pretest-question.dto';

export class UpdatePretestQuestionDto extends PartialType(
  CreatePretestQuestionDto,
) {}
