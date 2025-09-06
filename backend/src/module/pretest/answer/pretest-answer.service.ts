import { Injectable } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { CreatePretestAnswerDto } from './dto/create-pretest-answer.dto';

@Injectable()
export class PretestAnswerService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async submitPretestAnswer(
    studentId: string,
    courseId: string,
    answers: CreatePretestAnswerDto[],
  ) {
    const batch = this.coursesCollection.firestore.batch();

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

    const pretests = pretestDoc.docs.map((doc) => {
      const pretestData = doc.data();

      return {
        id: doc.id,
        question: pretestData.question,
        options: pretestData.options,
        correctAnswer: pretestData.correctAnswer,
      };
    });

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
      };
    });

    result.forEach((result) => {
      const answerDocRef = userDocRef.doc(result.id);
      batch.set(answerDocRef, result);
    });

    result.forEach((result) => {
      const answerDocRef = courseDocRef.doc(result.id);
      batch.set(answerDocRef, result);
    });

    await batch.commit();

    return { message: 'Pretest answers submitted successfully' };
  }

  async gradePretestAnswer(studentId: string, courseId: string) {
    const pretestDoc = await this.usersCollection
      .doc(studentId)
      .collection('enrollments')
      .doc(courseId)
      .collection('pretestAnswers')
      .get();
    let score = 0;

    await pretestDoc.docs.forEach((doc) => {
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
