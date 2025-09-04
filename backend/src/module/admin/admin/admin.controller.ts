import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-admin.dto';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/enum/role-enum';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles/roles.guard';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly AdminService: AdminService) {}

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
