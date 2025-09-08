import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { Enrollment, EnrollmentData } from 'src/common/types/enrollments-type';
import { UserData } from 'src/common/types/user-type';
import { formatDate } from 'src/common/utils/tranferDate';

@Injectable()
export class EnrollmentsService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async enrollCourse(
    studentId: string,
    courseId: string,
  ): Promise<{ message: string }> {
    const courseDoc = await this.coursesCollection.doc(courseId).get();
    const courseData = courseDoc.data() as Enrollment;
    if (!courseDoc.exists || !courseData)
      throw new NotFoundException('Course not found');

    const userDoc = await this.usersCollection.doc(studentId).get();
    const userData = userDoc.data() as UserData;
    if (!userDoc.exists || !userData)
      throw new NotFoundException('User not found');

    const enrollmentDoc = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .get();

    if (enrollmentDoc.exists)
      throw new ConflictException('User already enrolled in this course');

    await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .set({
        id: courseId,
        title: courseData.title,
        code: courseData.code,
        enrolledAt: new Date(),
        status: 'enrolled',
      });

    await this.coursesCollection
      .doc(courseId)
      .collection('students')
      .doc(studentId)
      .set({
        id: studentId,
        username: userData.username,
        email: userData.email,
        enrolledAt: new Date(),
        status: 'enrolled',
      });
    return { message: 'Enrollment successful' };
  }

  async getEnrollments(studentId: string): Promise<EnrollmentData[]> {
    const snapshot = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .get();
    const enrollments = await Promise.all(
      snapshot.docs.map((doc) => {
        const enrollmentData = doc.data() as Enrollment;
        return {
          id: enrollmentData.id,
          title: enrollmentData.title,
          code: enrollmentData.code,
          enrolledAt: formatDate(enrollmentData.enrolledAt.toDate()),
          status: enrollmentData.status,
        };
      }),
    );
    return enrollments;
  }
}
