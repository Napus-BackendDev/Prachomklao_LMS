import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/module/core/auth/enum/role-enum';

@Injectable()
export class AdminSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(private configService: ConfigService) {}

  async onApplicationBootstrap() {

    const password = this.configService.get<string>('ADMIN_PASSWORD');
    const adminData = {
      email: this.configService.get<string>('ADMIN_EMAIL'),
      password: await bcrypt.hash(password, 10),
      role: Role.ADMIN,
    };

    this.logger.log(`🌱 เริ่มการ Seed Admin Account`);
    this.logger.log(`📡 กำลังเชื่อมต่อกับ MongoDB:${this.configService.get<string>('MONGO_URL')}`,);
    this.logger.log(`👤 Admin_Username:${adminData.email}`);
    this.logger.log(`🔑 Admin_Password:${password}`);
    this.logger.log(`🔧 Admin_Role:${adminData.role}`);

    const usersCollection = firestore.collection('users')
    const existsSnap = await usersCollection.where('email', '==', adminData.email).get();
    if (!existsSnap.empty) return this.logger.log('⚠️ You already have an admin (by email).');
    await usersCollection.add(adminData)
    this.logger.log('✅ สร้างแอดมินสำเร็จ')
  }
}
