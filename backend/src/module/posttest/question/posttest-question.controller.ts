import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/module/core/auth/decorators/role.decorator";
import { Role } from "src/module/core/auth/enum/role-enum";
import { JwtAuthGuard } from "src/module/core/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/module/core/auth/roles/roles.guard";
import { PosttestQuestionService } from "./posttest-question.service";
import { UpdatePosttestQuestionDto } from "./dto/update-posttest-question.dto";
import { CreatePosttestQuestionDto } from "./dto/create-posttest-question.dto";


@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses/posttest/:courseId')
export class PosttestQuestionController {
    
    constructor(private posttestService: PosttestQuestionService) {}

    @Post()
    create(@Param('courseId') coursesId:string , @Body() questions: CreatePosttestQuestionDto[]) {
        return this.posttestService.create(coursesId, questions);
    }
    
    @Get()
    findAll(@Param('courseId') courseId: string) {
        return this.posttestService.findAll(courseId);
    }

    @Get(':posttestId')
    findbyId(@Param('courseId') coursesID: string, @Param('posttestId') posttestId:string) {
        return this.posttestService.findOne(coursesID, posttestId)
    }

    @Patch(':posttestId')
    update(@Param('courseId') coursesId: string, @Param('posttestId') posttestId: string , @Body() questions: UpdatePosttestQuestionDto) {
        return this.posttestService.update(coursesId, posttestId , questions);
    }

    @Delete(':posttestId')
    remove(@Param('courseId') courseId: string, @Param('posttestId') posttestId: string) {
        return this.posttestService.remove(courseId , posttestId);
    }
}
