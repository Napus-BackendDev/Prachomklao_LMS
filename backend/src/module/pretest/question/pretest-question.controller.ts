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
import { Roles } from 'src/module/core/auth/decorators/role.decorator';
import { Role } from 'src/module/core/auth/enum/role-enum';
import { JwtAuthGuard } from 'src/module/core/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/module/core/auth/roles/roles.guard';
import { UpdatePretestQuestionDto } from './dto/update-pretest-question.dto';
import { CreatePretestQuestionDto } from './dto/create-pretest-question.dto';
import { PretestQuestionService } from './pretest-question.service';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses/pretest/:courseId')
export class PrestestQuestionController {
  constructor(private pretestService: PretestQuestionService) {}

  @Post()
  create(
    @Param('courseId') courseId: string,
    @Body() questions: CreatePretestQuestionDto[],
  ) {
    return this.pretestService.create(courseId, questions);
  }

  @Get()
  findAll(@Param('courseId') courseId: string) {
    return this.pretestService.findAll(courseId);
  }

  @Get(':pretestId')
  findbyId(
    @Param('courseId') coursesID: string,
    @Param('pretestId') pretestId: string,
  ) {
    return this.pretestService.findOne(coursesID, pretestId);
  }

  @Patch(':pretestId')
  update(
    @Param('courseId') courseId: string,
    @Param('pretestId') pretestId: string,
    @Body() questions: UpdatePretestQuestionDto,
  ) {
    return this.pretestService.update(courseId, pretestId, questions);
  }

  @Delete(':pretestId')
  remove(
    @Param('courseId') courseId: string,
    @Param('pretestId') pretestId: string,
  ) {
    return this.pretestService.remove(courseId, pretestId);
  }
}
