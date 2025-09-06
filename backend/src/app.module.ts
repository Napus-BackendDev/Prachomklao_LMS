import { Module } from '@nestjs/common';
import { UserModule } from './module/core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './module/courses/courses.module';
import { AuthModule } from './module/core/auth/auth.module';
import { EnrollmentsModule } from './module/enrollments/enrollments.module';
import { PosttestAnswerModule } from './module/posttest/answer/posttest-answer.module';
import { PretestAnswerModule } from './module/pretest/answer/pretest-answer.module';
import { PosttestQuestionModule } from './module/posttest/question/posttest=question.module';
import { PretestQuestionModule } from './module/pretest/question/pretest-question.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CoursesModule,
    EnrollmentsModule,
    PosttestAnswerModule,
    PosttestQuestionModule,
    PretestAnswerModule,
    PretestQuestionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
