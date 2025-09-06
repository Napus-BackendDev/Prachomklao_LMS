import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './module/core/user/dto/create-user.dto';
import { CoursesService } from './module/courses/courses.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly coursesService: CoursesService,
  ) {}

  @Post('register')
  create(@Body() createStudentDto: CreateUserDto) {
    return this.appService.register(createStudentDto);
  }

  @Post('resetpassword')
  resetpassword(@Body() resetPassword: { email: string; password: string }) {
    return this.appService.resetPasssword(
      resetPassword.email,
      resetPassword.password,
    );
  }

  @Get('courses')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('courses/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
}
