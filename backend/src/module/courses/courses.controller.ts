import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../core/auth/decorators/role.decorator';
import { Role } from '../core/auth/enum/role-enum';
import { JwtAuthGuard } from '../core/auth/guard/jwt-auth.guard';
import { RolesGuard } from '../core/auth/roles/roles.guard';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto[]) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':courseId')
  updateCourse(@Param('courseId') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  @Patch(':courseId/content/:contentId')
  updateContent(@Param('courseId') courseId: string, @Param('contentId') contentId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateContent(courseId, contentId, updateCourseDto);
  }

  @Delete(':courseId')
  remove(@Param('courseId') courseId: string) {
    return this.coursesService.remove(courseId);
  }
}
