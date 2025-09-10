import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { firestore } from 'config/firebase.config';
import { formatDate } from 'src/common/utils/tranferDate';
import {
  Courses,
  CourseDetail,
  Student,
  StudentData,
} from 'src/common/interface/couse-interface';
import { PosttestQuestion } from 'src/common/interface/posttest-interface';
import { PretestQuestion } from 'src/common/interface/pretest-interface';

@Injectable()
export class CoursesService {
  private coursesCollection = firestore.collection('courses');

  async create(createCourseDto: CreateCourseDto[]): Promise<Courses[]> {
    if (createCourseDto.length === 0)
      throw new NotFoundException('Couser Empty');

    const mainCourse = {
      ...createCourseDto[0],
      urlPicture: `https://img.youtube.com/vi/${createCourseDto[0].url.split('v=')[1]}/0.jpg`,
      context: createCourseDto.slice(1).map((course) => ({
        ...course,
        urlPicture: `https://img.youtube.com/vi/${course.url.split('v=')[1]}/0.jpg`,
      })),
    };

    const docRef = this.coursesCollection.doc();
    await docRef.set(mainCourse);

    return [mainCourse];
  }

  async findAll(): Promise<Courses[]> {
    const snapshot = await this.coursesCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string): Promise<CourseDetail> {
    const course = await this.coursesCollection.doc(id).get();
    if (!course.exists) throw new NotFoundException();

    const courseData = course.data() as Courses;

    const [pretestDoc, posttestDoc, studentsDoc] = await Promise.all([
      this.coursesCollection.doc(id).collection('pretest').get(),
      this.coursesCollection.doc(id).collection('posttest').get(),
      this.coursesCollection.doc(id).collection('students').limit(5).get(),
    ]);

    const pretests = pretestDoc.docs.map(
      (data) =>
        ({
          id: data.id,
          ...data.data(),
        }) as PretestQuestion,
    );
    const posttests = posttestDoc.docs.map(
      (data) =>
        ({
          id: data.id,
          ...data.data(),
        }) as PosttestQuestion,
    );
    const students = studentsDoc.docs.map((data) => {
      const studentData = data.data() as StudentData;
      return {
        id: data.id,
        username: studentData.username,
        enrolledAt: formatDate(studentData.enrolledAt.toDate()),
      };
    }) as Student[];

    return {
      id: id,
      title: courseData.title!,
      url: courseData.url!,
      urlPicture: courseData.urlPicture!,
      students: students,
      pretest: pretests,
      posttest: posttests,
      pretest_totle: pretests.length,
      posttest_totle: posttests.length,
    };
  }

  async update( id: string, updateCourseDto: UpdateCourseDto[]): Promise<{ message: string; course: Courses }> {;
    if (updateCourseDto.length === 0) 
    throw new NotFoundException('Course Empty');
  
    const mainCourse = {
    ...updateCourseDto[0],
    ...(updateCourseDto[0].url && {
      urlPicture: `https://img.youtube.com/vi/${updateCourseDto[0].url.split('v=')[1]}/0.jpg`,
    }),
    context: updateCourseDto.slice(1).map((course) => ({
      ...course,
      ...(course.url && {
        urlPicture: `https://img.youtube.com/vi/${course.url.split('v=')[1]}/0.jpg`,
      }),
    })),
  };

    await this.coursesCollection.doc(id).set(mainCourse, { merge: true });
    return { message: 'Update Course complete', course: mainCourse };
  }

  async remove(id: string): Promise<{ message: string }> {
    const coursesRef = this.coursesCollection.doc(id);
    await this.coursesCollection.firestore.recursiveDelete(coursesRef);
    return { message: 'Delete Course Complete' };
  }
}
