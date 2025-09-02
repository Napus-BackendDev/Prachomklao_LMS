import { Module } from '@nestjs/common';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { AdminModule } from 'src/module/admin/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
