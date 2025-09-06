import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from './module/core/auth/enum/role-enum';
import { CreateUserDto } from './module/core/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { firestore } from 'config/firebase.config';

@Injectable()
export class AppService {
  private usersCollection = firestore.collection('users');

  async register(createUserDto: CreateUserDto) {
    const snapshot = await this.usersCollection
      .where('email', '==', createUserDto.email)
      .get();
    if (!snapshot.empty) throw new ConflictException('This email is use now');
    const password = await bcrypt.hash(createUserDto.password, 10);
    const userData = { ...createUserDto, password, role: Role.STUDENT };
    await this.usersCollection.add(userData);
    return { message: 'Register complete' };
  }
  
  async resetPasssword(email: string, password: string) {
    const userQuery = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (userQuery.empty) throw new UnauthorizedException('Invalid Email');

    const userDoc  = await userQuery.docs[0];
    const userId = await userDoc.id
    const newpassword = await bcrypt.hash(password, 10);

    await this.usersCollection
      .doc(userId)
      .update({ password: newpassword });
    return { message: 'Reset Password successfully' };
  }
}
