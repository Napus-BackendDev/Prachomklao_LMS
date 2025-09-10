import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { formatDate } from 'src/common/utils/tranferDate';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserData, UserDataWithCourses } from 'src/common/interface/user-interface';
import { Courses } from 'src/common/interface/couse-interface';
import { Enrollment } from 'src/common/interface/enrollments-interface';

@Injectable()
export class UserService {
  private usersCollection = firestore.collection('users');

  async findbyEmail(email: string): Promise<UserData> {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) throw new NotFoundException();
    const doc = snapshot.docs[0];
    const data = doc.data() as UserData;
    const userData = {
      id: doc.id,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
    };
    return userData;
  }

  async findAll(): Promise<UserData[]> {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as UserData,
    );
  }

  async findOne(studentId: string): Promise<UserDataWithCourses> {
    const userDoc = await this.usersCollection.doc(studentId).get();
    const userData = userDoc.data() as UserData;
    if (!userDoc.exists || !userData)
      throw new NotFoundException('User not found');

    // Fetch subcollection enroll
    const snapshot = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .limit(3)
      .get();
    const enrollments = await Promise.all(
      snapshot.docs.map((doc) => doc.data()) as Enrollment[],
    );

    return {
      id: userDoc.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      courses: enrollments.map((enrollment) => ({
        id: enrollment.id,
        title: enrollment.title,
        enrollment: formatDate(enrollment.enrolledAt.toDate()),
        status: enrollment.status,
      })),
    };
  }

  async update(
    studentId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const payload = instanceToPlain(updateUserDto);
    if (payload.password)
      payload.password = (await bcrypt.hash(payload.password, 10)) as string;
    else delete payload.password;
    await this.usersCollection.doc(studentId).update(payload);
    return { message: 'update complete' };
  }

  async remove(studentId: string): Promise<{ message: string }> {
    const studentRef = this.usersCollection.doc(studentId);
    await this.usersCollection.firestore.recursiveDelete(studentRef);
    return { message: 'Delete Student Complete' };
  }
}
