import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'config/firebase.config';
import { CreatePosttestAnswerDto } from './dto/create-posttest-answer.dto';

@Injectable()
export class PosttestAnswerService {
  private usersCollection = firestore.collection('users');
  private coursesCollection = firestore.collection('courses');

  async submitPosttestAnswer(
    studentId: string,
    courseId: string,
    answers: CreatePosttestAnswerDto[],
  ) {
    const [userDocRef, courseDocRef, posttestDoc] = await Promise.all([
      this.usersCollection
        .doc(studentId)
        .collection('enrollments')
        .doc(courseId)
        .collection('posttestAnswers'),
      this.coursesCollection
        .doc(courseId)
        .collection('students')
        .doc(studentId)
        .collection('posttestAnswers'),
      this.coursesCollection.doc(courseId).collection('posttest').get(),
    ]);

    if (!posttestDoc || posttestDoc.empty)
      throw new NotFoundException('Posttest not found for this course');

    const posttests = posttestDoc.docs.map((doc) => {
      const posttestData = doc.data();

      return {
        id: doc.id,
        question: posttestData.question,
        options: posttestData.options,
        correctAnswer: posttestData.correctAnswer,
      };
    });

    const invalidAnswers = answers.filter((a) => !posttests.some((p) => p.question === a.question),);
    if (invalidAnswers.length > 0) 
      throw new BadRequestException('Some answers are invalid');
    
    const batch = this.coursesCollection.firestore.batch();
    const results = posttests.map((posttest) => {
      const answer = answers.find(
        (answer) => answer.question === posttest.question,
      );
      return {
        id: posttest.id,
        question: posttest.question,
        options: posttest.options,
        answer: answer?.answer,
        correctAnswer: posttest.correctAnswer,
      };
    });

    results.forEach(result => {
      batch.set(userDocRef.doc(result.id), result);
      batch.set(courseDocRef.doc(result.id), result);
    });

    await batch.commit();
    return { message: 'Posttest answers submitted successfully' };
  }

  async gradePosttestAnswers(studentId: string, courseId: string) {
    const posttestDoc = await this.usersCollection.doc(studentId).collection('enrollments').doc(courseId).collection('posttestAnswers').get();
    if (posttestDoc.empty) 
      throw new NotFoundException('Not found posttest answer')
    let score = 0;

    await posttestDoc.docs.forEach((doc) => {
      const studentData = doc.data();
      if (studentData.answer === studentData.correctAnswer) {
        score++;
      }
    });

    return {
      message: 'Posttest answers graded successfully',
      score: score,
      total: posttestDoc.docs.length,
    };
  }
}
