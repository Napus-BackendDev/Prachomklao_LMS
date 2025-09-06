import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { instanceToPlain } from 'class-transformer';
import { CreatePretestQuestionDto } from './dto/create-pretest-question.dto';
import { UpdatePretestQuestionDto } from './dto/update-pretest-question.dto';

@Injectable()
export class PretestQuestionService {
  private coursesCollection = firestore.collection('courses');

  async create(courseId: string, questions: CreatePretestQuestionDto[]) {
    const pretestCollection = this.coursesCollection.doc(courseId).collection('pretest');
    const batch = this.coursesCollection.firestore.batch();
    questions.forEach((question) => {
      const docRef = pretestCollection.doc();
      batch.set(docRef, question);
    });
    await batch.commit();
    return { message: 'Pretest questions added successfully' };
  }

  async findAll(courseId: string) {
    const snapshot = await this.coursesCollection.doc(courseId).collection('pretest').get();
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return results;
  }

  async findOne(courseId: string, questionId: string) {
    const question = await this.coursesCollection.doc(courseId).collection('pretest').doc(questionId).get();
    if (!question.exists) 
      throw new NotFoundException('Not found this Question');
    const results = { id: question.id, ...question.data() };
    return results;
  }

  async update(courseId: string, questionId: string, questions: UpdatePretestQuestionDto ) {
    const docRef = await this.coursesCollection.doc(courseId).collection('pretest').doc(questionId);
    const doc = await docRef.get()
    if (!doc.exists) 
      throw new NotFoundException('Pretest question not found');

    const questionPayLoad = instanceToPlain(questions);
    await docRef.update(questionPayLoad)
    return { message: 'Update Pretest complete'};
  }

  async remove(courseId: string, pretestId: string) {
    await this.coursesCollection.doc(courseId).collection('pretest').doc(pretestId).delete();
    return { message: 'Delete Pretest complete' };
  }
}
