import { Module } from '@nestjs/common';
import { AdminController, StudentsController } from './user.controller';
import { AdminSeeder } from 'src/seed/admin.seeder';
import { UserService } from './user.service';

@Module({
  controllers: [AdminController, StudentsController],
  providers: [UserService, AdminSeeder],
  exports: [UserService],
})
export class UserModule {}
