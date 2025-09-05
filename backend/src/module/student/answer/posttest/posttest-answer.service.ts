import { Injectable, NotFoundException } from "@nestjs/common";
import { firestore } from "config/firebase.config";
import { CreatePosttestAnswerDto } from "./dto/create-posttest-answer.dto";


@Injectable()
export class PosttestAnswerService {
    private usersCollection = firestore.collection('users');
    private coursesCollection = firestore.collection('courses');

    async submitPosttestAnswer(studentId: string, courseId: string, answers: CreatePosttestAnswerDto) {
        // Check if user and course exist
        const [userDoc, courseDoc] = await Promise.all([
            this.usersCollection.doc(studentId).collection('enrollments').doc(courseId).get(),
            this.coursesCollection.doc(courseId).collection('students').doc(studentId).get()
        ]);
        if (!userDoc.exists) throw new NotFoundException('User not found');
        if (!courseDoc.exists) throw new NotFoundException('Course not found');

        console.log(userDoc.data())
        console.log(userDoc.data())
        
        return { message: 'Posttest answers submitted successfully' };
    }    
}