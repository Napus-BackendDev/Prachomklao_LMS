import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { formatDate } from 'src/common/utils/tranferDate';

@Injectable()
export class EnrollmentsService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async enrollCourse(studentId: string, courseId: string) {
    const courseDoc = await this.coursesCollection.doc(courseId).get();
    if (!courseDoc.exists) throw new NotFoundException('Course not found');

    const courseData = courseDoc.data();
    if (!courseData) throw new NotFoundException('Course data not found');

    const userDoc = await this.usersCollection.doc(studentId).get();
    if (!userDoc.exists) throw new NotFoundException('User not found');

    const userData = userDoc.data();
    if (!userData) throw new NotFoundException('User data not found');

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

  async getEnrollments(studentId: string) {
    const snapshot = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .get();
    const enrollments = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const enrollmentData = await doc.data();
        return {
          course: {
            id: enrollmentData.id,
            title: enrollmentData.title,
            code: enrollmentData.code,
            enrolledAt: formatDate(enrollmentData.enrolledAt.toDate()),
            status: enrollmentData.status,
          },
        };
      }),
    );
    return enrollments;
  }
}
