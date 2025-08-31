import { Module } from '@nestjs/common';
import { UsersService } from './admin.service';
import { UsersController } from './admin.controller';
import { AdminSeeder } from 'src/seed/admin.seeder';

@Module({
  controllers: [UsersController],
  providers: [UsersService , AdminSeeder],
  exports: [UsersService]
})
export class UsersModule {}
