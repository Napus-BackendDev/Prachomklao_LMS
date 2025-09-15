import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import {
  Enrollment,
  EnrollmentData,
} from 'src/common/interface/enrollments-interface';
import { UserData } from 'src/common/interface/user-interface';
import { formatDate } from 'src/common/utils/tranferDate';
import { Status } from './enum/status-enum';
import { CourseDetail, Courses } from 'src/common/interface/couse-interface';

@Injectable()
export class EnrollmentsService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async enrollCourse(
    studentId: string,
    courseId: string,
  ): Promise<{ message: string }> {
    const courseDoc = await this.coursesCollection.doc(courseId).get();
    const courseData = courseDoc.data() as Courses;
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

    if (enrollmentDoc.exists) throw new ConflictException('User already enrolled in this course');

    // คำนวณ total progress
    const contentLength = courseData?.content?.length || 1;
    const total = contentLength + 3; // +3 สำหรับบทเรียนหลักและ pretest และ posttest

    await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .set({
        id: courseId,
        title: courseData.title,
        urlPicture: courseData.urlPicture,
        enrolledAt: new Date(),
        status: Status.IN_PROGRESS,
        progress: { current: 0, total },
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
        status: Status.IN_PROGRESS,
        progress: { current: 0, total },
      });

    return { message: 'Enrollment successful' };
  }

  async updateProcessCourse(studentId: string, courseId: string) {
    const courseDoc = await this.coursesCollection.doc(courseId).get();
    const courseData = courseDoc.data() as Courses;
    if (!courseDoc.exists || !courseData)
      throw new NotFoundException('Course not found');

    const userDoc = await this.usersCollection.doc(studentId).get();
    const userData = userDoc.data() as UserData;
    if (!userDoc.exists || !userData)
      throw new NotFoundException('User not found');

    const enrollmentRef = this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId);
    const enrollmentDoc = await enrollmentRef.get();

    if (!enrollmentDoc.exists)
      throw new NotFoundException('User not enrolled in this course');

    const enrollmentData = enrollmentDoc.data() as Enrollment;
    const currentProgress = enrollmentData.progress?.current || 0;
    const totalProgress = enrollmentData.progress?.total || 1;

    const newProgress = Math.min(currentProgress + 1, totalProgress);

    await enrollmentRef.update({
      progress: { current: newProgress, total: totalProgress },
      status: newProgress === totalProgress ? Status.COMPLETED : Status.IN_PROGRESS,
    });
    const result = await enrollmentRef.get();
    return result.data() as Enrollment;
  }

  async updateEnrollStatus(
    studentId: string,
    courseId: string,
  ): Promise<EnrollmentData> {
    const courseDoc = await this.coursesCollection.doc(courseId).get();
    const courseData = courseDoc.data() as Enrollment;
    if (!courseDoc.exists || !courseData)
      throw new NotFoundException('Course not found');

    const userDoc = await this.usersCollection.doc(studentId).get();
    const userData = userDoc.data() as UserData;
    if (!userDoc.exists || !userData)
      throw new NotFoundException('User not found');

    const enrollmentRef = this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId);
    const enrollmentDoc = await enrollmentRef.get();

    if (!enrollmentDoc.exists)
      throw new ConflictException('User already enrolled in this course');

    await enrollmentRef.update({ status: Status.COMPLETED });

    const studentRef = this.coursesCollection
      .doc(courseId)
      .collection('students')
      .doc(studentId);
    await studentRef.update({ status: Status.COMPLETED });

    const updatedEnrollment = await enrollmentRef.get();
    const updatedData = updatedEnrollment.data() as Enrollment;
    return {
      id: updatedData.id,
      title: updatedData.title,
      enrolledAt: formatDate(updatedData.enrolledAt.toDate()),
      status: updatedData.status,
    };
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
          urlPicture: enrollmentData.urlPicture,
          enrolledAt: formatDate(enrollmentData.enrolledAt.toDate()),
          status: enrollmentData.status,
          progress: enrollmentData.progress,
        };
      }),
    );
    return enrollments;
  }

  async getEnrollmentById(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment> {
    const enrollmentRef = this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId);
    const enrollmentDoc = await enrollmentRef.get();

    if (!enrollmentDoc.exists) {
      throw new NotFoundException('Enrollment not found');
    }

    const enrollmentData = enrollmentDoc.data() as Enrollment;

    return {
      id: enrollmentData.id,
      title: enrollmentData.title,
      urlPicture: enrollmentData.urlPicture,
      enrolledAt: enrollmentData.enrolledAt,
      status: enrollmentData.status,
      progress: enrollmentData.progress,
    };
  }

}
