import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { CreatePretestAnswerDto } from './dto/create-pretest-answer.dto';
import {
  PretestAnswer,
  PretestQuestion,
  PretestScore,
} from 'src/common/interface/pretest-interface';

@Injectable()
export class PretestAnswerService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async submitPretestAnswer(
    studentId: string,
    courseId: string,
    answers: CreatePretestAnswerDto[],
  ): Promise<{ message: string; result: PretestAnswer[] }> {
    const [userDocRef, courseDocRef, pretestDoc] = await Promise.all([
      this.usersCollection
        .doc(studentId)
        .collection('enrollments')
        .doc(courseId)
        .collection('pretestAnswers'),
      this.coursesCollection
        .doc(courseId)
        .collection('students')
        .doc(studentId)
        .collection('pretestAnswers'),
      this.coursesCollection.doc(courseId).collection('pretest').get(),
    ]);

    if (!pretestDoc || pretestDoc.empty)
      throw new NotFoundException('Pretest not found for this course');

    const pretests = pretestDoc.docs.map((doc) => {
      const pretestData = doc.data() as PretestQuestion;

      return {
        id: doc.id,
        question: pretestData.question,
        options: pretestData.options,
        correctAnswer: pretestData.correctAnswer,
      };
    });

    const invalidAnswers = answers.filter(
      (a) => !pretests.some((p) => p.question === a.question),
    );
    if (invalidAnswers.length > 0)
      throw new BadRequestException('Some answers are invalid');

    const batch = this.coursesCollection.firestore.batch();
    const result = pretests.map((pretest) => {
      const answer = answers.find(
        (answer) => answer.question === pretest.question,
      );
      return {
        id: pretest.id,
        question: pretest.question,
        options: pretest.options,
        answer: answer?.answer,
        correctAnswer: pretest.correctAnswer,
      } as PretestAnswer;
    });

    result.forEach((result) => {
      batch.set(userDocRef.doc(result.id), result);
      batch.set(courseDocRef.doc(result.id), result);
    });

    await batch.commit();
    return { message: 'Pretest answers submitted successfully', result };
  }

  async gradePretestAnswer(
    studentId: string,
    courseId: string,
  ): Promise<PretestScore> {
    const pretestDoc = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .collection('pretestAnswers')
      .get();
    if (pretestDoc.empty)
      throw new NotFoundException('Not found pretest answer');
    let score = 0;

    pretestDoc.docs.forEach((doc) => {
      const studentData = doc.data();
      if (studentData.answer === studentData.correctAnswer) {
        score++;
      }
    });

    return {
      message: 'Pretest answers graded successfully',
      score: score,
      total: pretestDoc.docs.length,
    };
  }
}
