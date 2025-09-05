import { PartialType } from "@nestjs/mapped-types"
import { CreateStudentDto } from "../../../student/dto/create-student.dto";

export class UpdateUserDto extends PartialType(CreateStudentDto) {}
