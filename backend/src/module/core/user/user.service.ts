import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { firestore } from 'config/firebase.config';
import * as bcrypt from 'bcrypt';
import { formatDate } from 'src/common/utils/tranferDate';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserData,
  UserDataWithCourses,
} from 'src/common/interface/user-interface';
import { Enrollment } from 'src/common/interface/enrollments-interface';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class UserService {
  private usersCollection = firestore.collection('users');

  async findbyEmail(email: string): Promise<UserData> {
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
      createdAt: data.createdAt
    };
    return userData;
  }

  async findAll(): Promise<UserData[]> {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
        createdAt: data.createdAt,
      };
    });
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
        enrollment: formatDate((enrollment.enrolledAt as Timestamp).toDate()),
        status: enrollment.status,
      })),
    };
  }

  async getWeeklyNewUsers(): Promise<number[]> {
    const counts = [0, 0, 0, 0, 0, 0, 0];

    const now = new Date();
    const day = now.getDay() === 0 ? 7 : now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - day + 1);
    monday.setHours(0, 0, 0, 0);

    const snapshot = await this.usersCollection
      .where("createdAt", ">=", monday.toISOString())
      .get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt) {
        // รองรับทั้งกรณีเป็น string (ISO) หรือ Firestore Timestamp
        let created: Date | null = null;
        if (typeof data.createdAt === "string") {
          created = new Date(data.createdAt);
        } else if (typeof data.createdAt.toDate === "function") {
          created = data.createdAt.toDate();
        }
        if (created && !isNaN(created.getTime())) {
          let weekday = created.getDay();
          if (weekday === 0) weekday = 7;
          counts[weekday - 1]++;
        }
      }
    });

    return counts;
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
