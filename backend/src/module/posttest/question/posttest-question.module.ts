import { Module } from '@nestjs/common';
import { PosttestQuestionService } from './posttest-question.service';
import { PosttestQuestionController } from './posttest-question.controller';

@Module({
  controllers: [PosttestQuestionController],
  providers: [PosttestQuestionService],
})
export class PosttestQuestionModule {}
