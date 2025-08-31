import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Role } from 'src/module/auth/enum/role-enum';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class StudentsService {
  private usersCollection = firestore.collection('users');

  async register(createUserDto: CreateStudentDto) {
    const email = createUserDto.email.trim().toLowerCase();
    const snapshot = await this.usersCollection.where('email', '==', email).get();
    if (!snapshot.empty) throw new ConflictException('This email is use now');
    const password = await bcrypt.hash(createUserDto.password, 10);
    const userData = { ...createUserDto, password, email, role: Role.STUDENT };
    const docRef = await this.usersCollection.add(userData);
    return { id: docRef.id };
  }

  async update(id: string, updateUserDto: UpdateStudentDto) {
    const payload = instanceToPlain(updateUserDto);
    if (payload.password)
      payload.password = await bcrypt.hash(payload.password, 10);
    else delete payload.password;
    return await this.usersCollection.doc(id).update(payload);
  }

  remove(id: string) {
    this.usersCollection.doc(id).delete();
    return { message: 'Delect complete' };
  }
}
