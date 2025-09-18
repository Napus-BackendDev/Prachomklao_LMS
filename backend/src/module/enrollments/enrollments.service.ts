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
import { Courses } from 'src/common/interface/couse-interface';

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

    const [pretestDoc, posttestDoc] = await Promise.all([
      this.coursesCollection.doc(courseId).collection('pretest').get(),
      this.coursesCollection.doc(courseId).collection('posttest').get(),
    ]);

    await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .set({
        id: courseId,
        title: courseData.title ?? '',
        courseCode: courseData.courseCode ?? '',
        urlPicture: courseData.urlPicture ?? '',
        enrolledAt: new Date(),
        status: Status.IN_PROGRESS,
        progress: {
          current: 0,
          total:
            (courseData?.content?.length ?? 0) +
            1 +
            (pretestDoc.empty ? 0 : 1) +
            (posttestDoc.empty ? 0 : 1),
        },
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
        progress: {
          current: 1,
          total:
            (courseData?.content?.length ?? 0) +
            1 +
            (pretestDoc.empty ? 0 : 1) +
            (posttestDoc.empty ? 0 : 1),
        },
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
    const currentProgress = enrollmentData.progress?.current ?? 0;
    const totalProgress = enrollmentData.progress?.total ?? 0;
    const newProgress = Math.min(currentProgress + 1, totalProgress);

    await enrollmentRef.update({
      progress: { current: newProgress, total: totalProgress },
      status:
        newProgress === totalProgress ? Status.COMPLETED : Status.IN_PROGRESS,
    });
    const result = await enrollmentRef.get();
    const resultData = result.data() as Enrollment;
    return {
      enrollment: {
        ...resultData,
        enrolledAt: formatDate(resultData.enrolledAt.toDate()),
      },
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

        if (enrollmentData.status === Status.IN_PROGRESS)
          return {
            id: enrollmentData.id,
            title: enrollmentData.title,
            urlPicture: enrollmentData.urlPicture,
            enrolledAt: formatDate(enrollmentData.enrolledAt.toDate()),
            status: enrollmentData.status,
            progress: enrollmentData.progress,
          };

        return {
          id: enrollmentData.id,
          title: enrollmentData.title,
          courseCode: enrollmentData.courseCode,
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
