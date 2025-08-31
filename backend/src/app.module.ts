import { Module } from '@nestjs/common';
import { UsersModule } from './module/admin/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './module/students/student/student.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StudentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
