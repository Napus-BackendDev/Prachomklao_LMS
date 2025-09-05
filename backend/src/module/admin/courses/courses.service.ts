import { Injectable, NotFoundException } from '@nestjs/common';
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

    const results = await Promise.all(
      snapshot.docs.map(async (doc) => {
        // variable
        const coursesData = doc.data();

        // Fetch sub-collection
        const [pretestDoc, posttestDoc] = await Promise.all([
          this.coursesCollection.doc(doc.id).collection('pretest').get(),
          this.coursesCollection.doc(doc.id).collection('posttest').get(),
        ]);

        // Map data
        const pretests = pretestDoc.docs.map((data) => ({
          id: data.id,
          ...data.data(),
        }));
        const posttests = posttestDoc.docs.map((data) => ({
          id: data.id,
          ...data.data(),
        }));

        // Return
        return {
          id: doc.id,
          ...coursesData,
          pretest: pretests,
          posttest: posttests,
        };
      }),
    );

    return results;
  }

  async findOne(id: string) {
    const course = await this.coursesCollection.doc(id).get();

    if (!course.exists) throw new NotFoundException();

    // variable
    const courseData = course.data();

    // Fetch sub-collection
    const [pretestDoc, posttestDoc] = await Promise.all([
      this.coursesCollection.doc(id).collection('pretest').get(),
      this.coursesCollection.doc(id).collection('posttest').get(),
    ]);
    // Map data
    const pretests = pretestDoc.docs.map((data) => ({ id: data.id, ...data.data() }));
    const posttests = posttestDoc.docs.map((data) => ({ id: data.id, ...data.data() }));

    // returnData
    const results = {
      id: id,
      ...courseData,
      pretest: pretests,
      posttest: posttests,
    }
    return results;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesCollection.doc(id).get();
    if (!course.exists) throw new NotFoundException();
    
    const payload = {
      ...updateCourseDto,
      ...(updateCourseDto.url && { urlPicture: `https://img.youtube.com/vi/${updateCourseDto.url.split('v=')[1]}/0.jpg`})
    };

    const results = await this.coursesCollection.doc(id).update(payload)
    return results;
  }

  async remove(id: string) {
    const coursesRef = this.coursesCollection.doc(id);
    await this.coursesCollection.firestore.recursiveDelete(coursesRef);
    return { message: 'Delete Course Complete'};
  }
}
