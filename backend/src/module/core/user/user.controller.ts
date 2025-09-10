import {
  Controller,
  Get,
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
import { UserService } from './user.service';
import { User } from 'src/common/interface/user-interface';

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

@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('student')
export class StudentsController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getProfile(@Request() req: User) {
    return this.userService.findOne(req.user.id);
  }

  @Patch()
  update(@Request() req: User, @Body() updateStudentDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateStudentDto);
  }

  @Delete()
  remove(@Request() req: User) {
    return this.userService.remove(req.user.id);
  }
}
