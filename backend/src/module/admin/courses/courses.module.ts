import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PretestService } from './pretest/pretest.service';
import { PrestestController } from './pretest/pretest.controller';
import { PosttestController } from './posttest/posttest.controller';
import { PosttestService } from './posttest/posttest.service';

@Module({
  controllers: [CoursesController, PrestestController, PosttestController],
  providers: [CoursesService, PretestService, PosttestService],
})
export class CoursesModule {}
