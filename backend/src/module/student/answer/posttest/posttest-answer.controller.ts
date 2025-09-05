import { Body, Controller, Param, Post, UseGuards, Request } from "@nestjs/common";
import { Roles } from "src/module/auth/decorators/role.decorator";
import { Role } from "src/module/auth/enum/role-enum";
import { JwtAuthGuard } from "src/module/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/module/auth/roles/roles.guard";
import { CreatePosttestAnswerDto } from "./dto/create-posttest-answer.dto";
import { PosttestAnswerService } from "./posttest-answer.service";

@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students/courses/:courseId/answer/posttest')
export class PosttestAnswerController {
    constructor(private posttestAnswerService: PosttestAnswerService) {}

    @Post()
    submitAnswers(@Request() req, @Param('courseId') courseId: string, @Body() answers: CreatePosttestAnswerDto) {
        return this.posttestAnswerService.submitPosttestAnswer(req.user.id, courseId, answers);
    }
}