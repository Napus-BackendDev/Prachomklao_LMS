import { Body, Controller, Param, Post, UseGuards, Request, Get } from "@nestjs/common";
import { CreatePosttestAnswerDto } from "./dto/create-posttest-answer.dto";
import { PosttestAnswerService } from "./posttest-answer.service";
import { Roles } from "src/module/core/auth/decorators/role.decorator";
import { Role } from "src/module/core/auth/enum/role-enum";
import { JwtAuthGuard } from "src/module/core/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/module/core/auth/roles/roles.guard";

@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('student/courses/:courseId/answer/posttest')
export class PosttestAnswerController {
    constructor(private posttestAnswerService: PosttestAnswerService) {}

    @Post()
    submitAnswers(@Request() req, @Param('courseId') courseId: string, @Body() answers: CreatePosttestAnswerDto[]) {
        return this.posttestAnswerService.submitPosttestAnswer(req.user.id, courseId, answers);
    }

    @Get()
    gradeAnswers(@Request() req, @Param('courseId') courseId: string) {
        return this.posttestAnswerService.gradePosttestAnswers(req.user.id, courseId);
    }

}