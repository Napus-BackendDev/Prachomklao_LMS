import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePretestAnswerDto } from './dto/create-pretest-answer.dto';
import { PretestAnswerService } from './pretest-answer.service';
import { Roles } from 'src/module/core/auth/decorators/role.decorator';
import { Role } from 'src/module/core/auth/enum/role-enum';
import { JwtAuthGuard } from 'src/module/core/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/core/auth/roles/roles.guard';
import { User } from 'src/common/types/user-type';

@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('student/courses/:courseId/answer/pretest')
export class PretestAnswerController {
  constructor(private readonly pretestAnswerService: PretestAnswerService) {}

  @Post()
  submitAnswer(
    @Request() req: User,
    @Param('courseId') courseId: string,
    @Body() answers: CreatePretestAnswerDto[],
  ) {
    return this.pretestAnswerService.submitPretestAnswer(
      req.user.id,
      courseId,
      answers,
    );
  }

  @Get()
  gradeAnswer(@Request() req: User, @Param('courseId') courseId: string) {
    return this.pretestAnswerService.gradePretestAnswer(req.user.id, courseId);
  }
}
