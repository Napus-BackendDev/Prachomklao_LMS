import { Injectable } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { CreatePretestDto } from '../pretest/dto/create-pretest.dto';
import { UpdatePosttestDto } from './dto/update-posttest.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PosttestService {
  private coursesCollection = firestore.collection('courses');

  async create(coursesId: string, question: CreatePretestDto[]) {
    const batch = this.coursesCollection.firestore.batch();
    const posttestCollection = this.coursesCollection
      .doc(coursesId)
      .collection('posttest');

    question.forEach((question) => {
      const docRef = posttestCollection.doc();
      batch.set(docRef, question);
    });
    await batch.commit();

    return { message: 'Posttest questions added successfully' };
  }

  async findAll(coursesId: string) {
    const snapshot = await this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .get();
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return results;
  }

  async findOne(coursesId: string, questionId: string) {
    const question = await this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .doc(questionId)
      .get();
    return question.data();
  }

  async update(
    coursesId: string,
    questionId: string,
    question: UpdatePosttestDto,
  ) {
    const questionPayLoad = instanceToPlain(question);
    const results = await this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .doc(questionId)
      .update(questionPayLoad);
    return results;
  }
}
