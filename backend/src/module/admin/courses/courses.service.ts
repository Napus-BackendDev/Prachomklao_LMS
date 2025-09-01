import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { firestore } from 'config/firebase.config';

@Injectable()
export class CoursesService {
  private coursesCollection = firestore.collection('courses');

  async create(createCourseDto: CreateCourseDto) {
    const payload = {
      ...createCourseDto,
      urlPicture: `https://img.youtube.com/vi/${createCourseDto.url.split('v=')[1]}/0.jpg`,
    };
    return await this.coursesCollection.add(payload);
  }

  async findAll() {
    const snapshot = await this.coursesCollection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const course = await this.coursesCollection.doc(id).get();
    return course.data();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const payload = {
      ...updateCourseDto,
      ...(updateCourseDto.url && {
        urlPicture: `https://img.youtube.com/vi/${updateCourseDto.url.split('v=')[1]}/0.jpg`,
      }),
    };
    return await this.coursesCollection.doc(id).update(payload);
  }

  remove(id: string) {
    return this.coursesCollection.doc(id).delete();
  }
}
