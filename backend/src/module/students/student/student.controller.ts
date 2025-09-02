import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from 'src/module/auth/decorators/role.decorator';
import { Role } from 'src/module/auth/enum/role-enum';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/roles/roles.guard';
import { AdminService } from 'src/module/admin/admin/admin.service';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService , private adminService: AdminService ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.register(createStudentDto);
  }

  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return this.adminService.findbyEmail(req.user.email);
  }

  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(req.user.id, updateStudentDto);
  }

  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req) {
    return this.studentsService.remove(req.user.id);
  }
}
