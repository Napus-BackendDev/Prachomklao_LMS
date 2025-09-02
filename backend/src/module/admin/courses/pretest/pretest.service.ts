import { Injectable } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { CreatePretestDto } from './dto/create-pretest.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdatePretestDto } from './dto/update-pretest.dto';

@Injectable()
export class PretestService {
  private coursesCollection = firestore.collection('courses');

  async create(courseId: string, questions: CreatePretestDto[]) {
    const batch = this.coursesCollection.firestore.batch();
    const pretestCollection = this.coursesCollection
      .doc(courseId)
      .collection('pretest');

    questions.forEach((question) => {
      const docRef = pretestCollection.doc();
      batch.set(docRef, question);
    });

    await batch.commit();
    return { message: 'Pretest questions added successfully' };
  }

  async findAll(courseId: string) {
    const snapshot = await this.coursesCollection
      .doc(courseId)
      .collection('pretest')
      .get();
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return results;
  }

  async findOne(courseId: string, questionId: string) {
    const question = await this.coursesCollection
      .doc(courseId)
      .collection('pretest')
      .doc(questionId)
      .get();
    return question.data();
  }

  async update(
    courseId: string,
    questionId: string,
    questions: UpdatePretestDto,
  ) {
    const questionPayLoad = instanceToPlain(questions);
    const results = await this.coursesCollection
      .doc(courseId)
      .collection('pretest')
      .doc(questionId)
      .update(questionPayLoad);
    return results;
  }

  remove(courseId: string, pretestId: string) {
    return this.coursesCollection.doc(courseId).collection('pretest').doc(pretestId).delete();
  }
}
