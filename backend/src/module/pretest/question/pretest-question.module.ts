import { Module } from "@nestjs/common";
import { PretestQuestionService } from "./pretest-question.service";
import { PrestestQuestionController } from "./pretest-question.controller";


@Module({
  controllers: [PrestestQuestionController],
  providers: [PretestQuestionService],
})
export class PretestQuestionModule {}