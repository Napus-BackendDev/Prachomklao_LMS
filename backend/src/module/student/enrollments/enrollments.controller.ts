import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Roles } from 'src/module/auth/decorators/role.decorator';
import { Role } from 'src/module/auth/enum/role-enum';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/roles/roles.guard';

@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('student/courses/enroll')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':courseId')
  enrollCourse(@Request() req, @Param('courseId') courseId: string) {
    return this.enrollmentsService.enrollCourse(req.user.id, courseId);
  }

  @Get()
  getEnrollments(@Request() req) {
    return this.enrollmentsService.getEnrollments(req.user.id);
  }
}
