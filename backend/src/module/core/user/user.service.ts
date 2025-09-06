import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { formatDate } from 'src/common/utils/tranferDate';
import { Role } from '../auth/enum/role-enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private usersCollection = firestore.collection('users');

  async register(createUserDto: CreateUserDto) {
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

  async findbyEmail(email: string) {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) throw new NotFoundException();
    const doc = snapshot.docs[0];
    const data = doc.data();
    const userData = {
      id: doc.id,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
    };
    return userData;
  }

  async findAll() {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const user = await this.usersCollection.doc(id).get();
    return user.data();
  }

  async update(studentId: string, updateUserDto: UpdateUserDto) {
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

  async findById(studentId: string) {
    const userDoc = await this.usersCollection.doc(studentId).get();
    if (!userDoc.exists) throw new NotFoundException('User not found');
    const userData = userDoc.data();
    if (!userData) throw new NotFoundException('User data not found');

    // Fetch subcollection enroll
    const snapshot = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .limit(3)
      .get();
    const enrollments = await Promise.all(
      snapshot.docs.map((doc) => doc.data()),
    );

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
        status: enrollment.status,
      })),
    };
  }
}
