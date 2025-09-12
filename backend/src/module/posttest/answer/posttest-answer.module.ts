import { Module } from '@nestjs/common';
import { PosttestAnswerController } from './posttest-answer.controller';
import { PosttestAnswerService } from './posttest-answer.service';

@Module({
  controllers: [PosttestAnswerController],
  providers: [PosttestAnswerService],
})
export class PosttestAnswerModule {}
