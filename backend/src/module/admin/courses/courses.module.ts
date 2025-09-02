import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PretestService } from './pretest/pretest.service';
import { PrestestController } from './pretest/pretest.controller';

@Module({
  controllers: [CoursesController, PrestestController],
  providers: [CoursesService, PretestService],
})
export class CoursesModule {}
