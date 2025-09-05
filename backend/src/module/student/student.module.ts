import { Module } from '@nestjs/common';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { AdminModule } from 'src/module/admin/admin/admin.module';
import { EnrollmentsService } from './enrollments/enrollments.service';
import { EnrollmentsController } from './enrollments/enrollments.controller';

@Module({
  imports: [AdminModule],
  controllers: [StudentsController, EnrollmentsController],
  providers: [StudentsService, EnrollmentsService],
})
export class StudentsModule {}
