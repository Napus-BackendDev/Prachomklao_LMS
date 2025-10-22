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
import { extractYoutubeId } from 'src/common/utils/youtube';
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
      urlPicture: `https://img.youtube.com/vi/${extractYoutubeId(createCourseDto[0].url)}/0.jpg`,
      content: createCourseDto.slice(1).map((course) => ({
        id: this.coursesCollection.doc().id,
        ...course,
        urlPicture: `https://img.youtube.com/vi/${extractYoutubeId(course.url)}/0.jpg`,
      })),
    };

    const docRef = this.coursesCollection.doc();
    await docRef.set(mainCourse);

    return [mainCourse];
  }

  async findAll(): Promise<Courses[]> {
    const snapshot = await this.coursesCollection.get();
    const result = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const courseData = doc.data();
        const totalStudent = this.coursesCollection.doc(doc.id).collection('students').get();
        const totalStudentCount = (await totalStudent).docs.length;
        return {
          id: doc.id,
          title: courseData.title,
          courseCode: courseData.courseCode,
          url: courseData.url,
          urlPicture: courseData.urlPicture,
          totalStudent: totalStudentCount
        } as Courses;
      })
    );

    return result;
  }

  async findOne(id: string): Promise<CourseDetail> {
    const course = await this.coursesCollection.doc(id).get();
    if (!course.exists)
      throw new NotFoundException();

    const courseData = course.data() as Courses;

    const [pretestDoc, posttestDoc, studentsDoc, totalStudent] = await Promise.all([
      this.coursesCollection.doc(id).collection('pretest').get(),
      this.coursesCollection.doc(id).collection('posttest').get(),
      this.coursesCollection.doc(id).collection('students').limit(5).get(),
      this.coursesCollection.doc(id).collection('students').get().then((snapshot) => snapshot.docs.length),
    ]);

    const pretests = pretestDoc.docs.map((data) => ({ id: data.id, ...data.data() }) as PretestQuestion);
    const posttests = posttestDoc.docs.map((data) => ({ id: data.id, ...data.data() }) as PosttestQuestion);
    const students = studentsDoc.docs.map((data) => {
      const studentData = data.data() as StudentData;
      return {
        id: data.id,
        username: studentData.username,
        enrolledAt: formatDate(studentData.enrolledAt.toDate()),
      };
    }) as Student[];

    return {
      courses: { id: course.id, ...courseData },
      students: students,
      totalStudent: totalStudent,
      pretest: pretests,
      posttest: posttests,
      pretest_totle: pretests.length,
      posttest_totle: posttests.length,
    };
  }

  async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<{ message: string; course: Courses }> {

    const courseDoc = this.coursesCollection.doc(courseId);
    const mainCourse = {
      ...updateCourseDto,
      ...(updateCourseDto.url && {
       urlPicture: `https://img.youtube.com/vi/${extractYoutubeId(UpdateCourseDto.url)/0.jpg`,
      }),
    };

    await courseDoc.update(mainCourse);

    const courseSnapshot = await courseDoc.get();
    if (!courseSnapshot.exists) throw new NotFoundException('Course not found');

    const courseData = courseSnapshot.data() as Courses;
    return { message: 'Update Course complete', course: courseData };
  }

  async updateContent(courseId: string, contentId: string, updateCourseDto: UpdateCourseDto): Promise<{ message: string; content: Courses }> {

    const courseDoc = this.coursesCollection.doc(courseId);
    const courseSnapshot = await courseDoc.get();
    if (!courseSnapshot.exists) throw new NotFoundException('Course not found');

    const courseData = courseSnapshot.data() as Courses;
    if (!courseData.content) throw new NotFoundException('Content not found');

    const contentIndex = courseData.content.findIndex((c) => c.id === contentId);
    if (contentIndex === -1) throw new NotFoundException('Content not found');

    const updatedContent = {
      ...courseData.content[contentIndex],
      ...updateCourseDto,
      ...(updateCourseDto.url && {
        urlPicture: `https://img.youtube.com/vi/${extractYoutubeId(UpdateCourseDto.url)/0.jpg`,
      }),
    };

    courseData.content[contentIndex] = updatedContent;
    await courseDoc.update({ content: courseData.content });
    return { message: 'Update Content complete', content: updatedContent };
  }

  async remove(courseId: string): Promise<{ message: string }> {
    const coursesRef = this.coursesCollection.doc(courseId);
    await this.coursesCollection.firestore.recursiveDelete(coursesRef);
    return { message: 'Delete Course Complete' };
  }
}
