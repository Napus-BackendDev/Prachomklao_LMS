import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { instanceToPlain } from 'class-transformer';
import { CreatePretestQuestionDto } from './dto/create-pretest-question.dto';
import { UpdatePretestQuestionDto } from './dto/update-pretest-question.dto';

@Injectable()
export class PretestQuestionService {
  private coursesCollection = firestore.collection('courses');

  async create(courseId: string, questions: CreatePretestQuestionDto[]) {
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
    if (!question.exists) throw new NotFoundException('Not found this Question');
    const results = { id: question.id, ...question.data() };
    return results;
  }

  async update(
    courseId: string,
    questionId: string,
    questions: UpdatePretestQuestionDto,
  ) {
    const questionPayLoad = instanceToPlain(questions);
    await this.coursesCollection
      .doc(courseId)
      .collection('pretest')
      .doc(questionId)
      .update(questionPayLoad);
    return { message: 'Update Pretest complete'};
  }

  remove(courseId: string, pretestId: string) {
    this.coursesCollection
      .doc(courseId)
      .collection('pretest')
      .doc(pretestId)
      .delete();
    return { message: 'Delete Pretest complete' };
  }
}
