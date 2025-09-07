import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Role } from 'src/module/auth/enum/role-enum';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

import { formatDate } from 'src/common/utils/tranferDate';

@Injectable()
export class StudentsService {
  private usersCollection = firestore.collection('users');

  async register(createUserDto: CreateStudentDto) {
    const email = createUserDto.email.trim().toLowerCase();
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (!snapshot.empty) throw new ConflictException('This email is use now');
    const password = await bcrypt.hash(createUserDto.password, 10);
    const userData = { ...createUserDto, password, email, role: Role.STUDENT };
    await this.usersCollection.add(userData);
    return { message: 'Register complete' };
  }

  async findById(studentId: string) {
    const userDoc = await this.usersCollection.doc(studentId).get();
    if (!userDoc.exists) throw new NotFoundException('User not found');
    const userData = userDoc.data();
    if (!userData) throw new NotFoundException('User data not found');

    // Fetch subcollection enroll
    const snapshot = await this.usersCollection.doc(studentId).collection('enrollments').limit(3).get();
    const enrollments = await Promise.all(snapshot.docs.map((doc) => doc.data()))

    return {
      id: userDoc.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      courses: enrollments.map((enrollment) => ({
        id: enrollment.id,
        title: enrollment.title,
        code: enrollment.code,
        enrollment: formatDate(enrollment.enrolledAt.toDate()),
        status: enrollment.status
      })),
    };
  }

  async update(studentId: string, updateUserDto: UpdateStudentDto) {
    const payload = instanceToPlain(updateUserDto);
    if (payload.password)
      payload.password = await bcrypt.hash(payload.password, 10);
    else delete payload.password;
    await this.usersCollection.doc(studentId).update(payload);
    return { message: 'update complete' };
  }

  async remove(studentId: string) {
    const studentRef = this.usersCollection.doc(studentId);
    await this.usersCollection.firestore.recursiveDelete(studentRef);
    return { message: 'Delete Student Complete' };
  }
}
