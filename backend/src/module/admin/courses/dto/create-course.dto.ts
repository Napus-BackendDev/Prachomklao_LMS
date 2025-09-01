import { IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    code:string

    @IsString()
    url:string
}
