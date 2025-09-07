import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { firestore } from 'config/firebase.config';
import { formatDate } from 'src/common/utils/tranferDate';

@Injectable()
export class CoursesService {
  private coursesCollection = firestore.collection('courses');

  async create(createCourseDto: CreateCourseDto) {
    const payload = {
      ...createCourseDto,
      urlPicture: `https://img.youtube.com/vi/${createCourseDto.url.split('v=')[1]}/0.jpg`,
    };
    await this.coursesCollection.add(payload)
    return { message: 'Create Cousere complete'};
  }

  async findAll() {
    const snapshot = await this.coursesCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  async findOne(id: string) {
    const course = await this.coursesCollection.doc(id).get();
    if (!course.exists) 
      throw new NotFoundException();

    const courseData = course.data();

    const [pretestDoc, posttestDoc, studentsDoc] = await Promise.all([
      this.coursesCollection.doc(id).collection('pretest').get(),
      this.coursesCollection.doc(id).collection('posttest').get(),
      this.coursesCollection.doc(id).collection('students').limit(5).get(),
    ]);

    const pretests = pretestDoc.docs.map((data) => ({ id: data.id, ...data.data() }));
    const posttests = posttestDoc.docs.map((data) => ({ id: data.id, ...data.data() }));
    const students = studentsDoc.docs.map((data) => {
      const studentData = data.data()
      return {
        id:data.id, 
        username: studentData.username, 
        enrolledAt: formatDate(studentData.enrolledAt.toDate())
      }
    })
    
    return {
      id: id,
      ...courseData,
      students: {...students},
      pretest: {...pretests},
      posttest: {...posttests},
      pretest_Totle: pretests.length,
      posttest_Totle: posttests.length
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesCollection.doc(id).get();
    if (!course.exists) 
      throw new NotFoundException('Not found Course');
    
    const payload = {
      ...updateCourseDto,
      ...(updateCourseDto.url && { urlPicture: `https://img.youtube.com/vi/${updateCourseDto.url.split('v=')[1]}/0.jpg`})
    };

    await this.coursesCollection.doc(id).update(payload)
    return { message: 'Update Course complete'};
  }

  async remove(id: string) {
    const coursesRef = this.coursesCollection.doc(id);
    await this.coursesCollection.firestore.recursiveDelete(coursesRef);
    return { message: 'Delete Course Complete'};
  }
}
