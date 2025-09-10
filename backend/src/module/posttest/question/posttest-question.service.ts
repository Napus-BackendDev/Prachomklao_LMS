import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { instanceToPlain } from 'class-transformer';
import { CreatePosttestQuestionDto } from './dto/create-posttest-question.dto';
import { UpdatePosttestQuestionDto } from './dto/update-posttest-question.dto';
import { PosttestQuestion } from 'src/common/interface/posttest-interface';

@Injectable()
export class PosttestQuestionService {
  private coursesCollection = firestore.collection('courses');

  async create(
    coursesId: string,
    question: CreatePosttestQuestionDto[],
  ): Promise<{ message: string }> {
    const posttestCollection = this.coursesCollection
      .doc(coursesId)
      .collection('posttest');
    const batch = this.coursesCollection.firestore.batch();
    question.forEach((question) => {
      batch.set(posttestCollection.doc(), question);
    });
    await batch.commit();
    return { message: 'Posttest questions added successfully' };
  }

  async findAll(coursesId: string): Promise<{ questions: PosttestQuestion[] }> {
    const snapshot = await this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .get();
    const results = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as PosttestQuestion,
    );
    return { questions: results };
  }

  async findOne(
    coursesId: string,
    questionId: string,
  ): Promise<PosttestQuestion> {
    const question = await this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .doc(questionId)
      .get();
    if (!question.exists)
      throw new NotFoundException('Not found this question');
    const results = { id: question.id, ...question.data() } as PosttestQuestion;
    return results;
  }

  async update(
    coursesId: string,
    questionId: string,
    question: UpdatePosttestQuestionDto,
  ): Promise<{ message: string }> {
    const docRef = this.coursesCollection
      .doc(coursesId)
      .collection('posttest')
      .doc(questionId);
    const doc = await docRef.get();
    if (!doc.exists) throw new NotFoundException('Posttest question not found');

    const questionPayLoad = instanceToPlain(question);
    await docRef.update(questionPayLoad);
    return { message: 'Update Posttest complete' };
  }

  async remove(
    courseId: string,
    posttestId: string,
  ): Promise<{ message: string }> {
    await this.coursesCollection
      .doc(courseId)
      .collection('posttest')
      .doc(posttestId)
      .delete();
    return { message: 'Delete Posttest complete' };
  }
}
