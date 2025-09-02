import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSeeder } from 'src/seed/admin.seeder';

@Module({
  controllers: [AdminController],
  providers: [AdminService , AdminSeeder],
  exports: [AdminService]
})
export class AdminModule {}
