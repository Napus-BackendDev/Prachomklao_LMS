import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './module/students/student/student.module';
import { CoursesModule } from './module/admin/courses/courses.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    StudentsModule,
    CoursesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
