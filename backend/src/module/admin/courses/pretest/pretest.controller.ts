import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/module/auth/decorators/role.decorator';
import { Role } from 'src/module/auth/enum/role-enum';
import { PretestService } from './pretest.service';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/roles/roles.guard';
import { CreatePretestDto } from './dto/create-pretest.dto';
import { UpdatePretestDto } from './dto/update-pretest.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses/pretest')
export class PrestestController {
  constructor(private pretestService: PretestService) {}

  @Post(':courseId')
  create(@Param('courseId') courseId: string, @Body() questions: CreatePretestDto[]) {
    return this.pretestService.create(courseId, questions);
  }

  @Get(':courseId')
  findAll(@Param('courseId') courseId: string) {
    return this.pretestService.findAll(courseId);
  }

  @Patch(':courseId/:pretestId')
  update(@Param('courseId') courseId: string, @Param('pretestId') pretestId: string , @Body() questions: UpdatePretestDto) {
    return this.pretestService.update(courseId, pretestId , questions);
  }

  @Delete(':courseId/:pretestId')
  remove(@Param('courseId') courseId: string, @Param('pretestId') pretestId: string) {
    return this.pretestService.remove(courseId , pretestId);
  }
}
