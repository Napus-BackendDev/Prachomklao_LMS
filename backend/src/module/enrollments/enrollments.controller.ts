import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Roles } from '../core/auth/decorators/role.decorator';
import { Role } from '../core/auth/enum/role-enum';
import { JwtAuthGuard } from '../core/auth/guard/jwt-auth.guard';
import { RolesGuard } from '../core/auth/roles/roles.guard';


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
