import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from '../../dto/create-course.dto';

export class UpdatePosttestDto extends PartialType(CreateCourseDto) {}
