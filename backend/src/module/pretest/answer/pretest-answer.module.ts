import { Module } from '@nestjs/common';
import { PretestAnswerController } from './pretest-answer.controller';
import { PretestAnswerService } from './pretest-answer.service';

@Module({
  controllers: [PretestAnswerController],
  providers: [PretestAnswerService],
})
export class PretestAnswerModule {}
