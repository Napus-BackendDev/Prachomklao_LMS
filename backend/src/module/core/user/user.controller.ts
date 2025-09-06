import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enum/role-enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly AdminService: UserService) {}

  @Get()
  findAll() {
    return this.AdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AdminService.findOne(id);
  }

  @Get('/email/:email')
  findbyemail(@Param('email') email: string) {
    return this.AdminService.findbyEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.AdminService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AdminService.remove(id);
  }
}

@Controller('student')
export class StudentsController {
  constructor(private readonly AdminService: UserService) {}

  @Post()
  create(@Body() createStudentDto: CreateUserDto) {
    return this.AdminService.register(createStudentDto);
  }

  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getProfile(@Request() req) {
    return this.AdminService.findById(req.user.id);
  }

  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  update(@Request() req, @Body() updateStudentDto: UpdateUserDto) {
    return this.AdminService.update(req.user.id, updateStudentDto);
  }

  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  remove(@Request() req) {
    return this.AdminService.remove(req.user.id);
  }
}
