import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreatePosttestDto } from "./dto/create-posttest.dto";
import { UpdatePosttestDto } from "./dto/update-posttest.dto";
import { PosttestService } from "./posttest.service";
import { Roles } from "src/module/auth/decorators/role.decorator";
import { Role } from "src/module/auth/enum/role-enum";
import { JwtAuthGuard } from "src/module/auth/guard/jwt-auth.guard";
import { RolesGuard } from "src/module/auth/roles/roles.guard";

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses/posttest')
export class PosttestController {
    
    constructor(private posttestService: PosttestService) {}

    @Post(':courseId')
    create(@Param('courseId') coursesId:string , @Body() questions: CreatePosttestDto[]) {
        return this.posttestService.create(coursesId, questions);
    }
    
    @Get(':courseId')
    findAll(@Param('courseId') courseId: string) {
        return this.posttestService.findAll(courseId);
    }

    @Get(':courseId/:posttestId')
    findbyId(@Param('courseId') coursesID: string, @Param('posttestId') posttestId:string) {
        return this.posttestService.findOne(coursesID, posttestId)
    }

    @Patch(':courseId/:posttestId')
    update(@Param('courseId') coursesId: string, @Param('posttestId') posttestId: string , @Body() questions: UpdatePosttestDto) {
        return this.posttestService.update(coursesId, posttestId , questions);
    }

    @Delete(':courseId/:posttestId')
    remove(@Param('courseId') courseId: string, @Param('posttestId') posttestId: string) {
        return this.posttestService.remove(courseId , posttestId);
    }
}
