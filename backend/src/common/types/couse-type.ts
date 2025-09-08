import { Timestamp } from 'firebase-admin/firestore';
import { PosttestQuestion } from './posttest-type';
import { PretestQuestion } from './pretest-type';

export interface Courses {
  id?: string;
  title?: string;
  code?: string;
  url?: string;
  urlPicture?: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  code: string;
  url: string;
  urlPicture: string;
  students: Student[];
  pretest: PretestQuestion[];
  posttest: PosttestQuestion[];
  pretest_totle: number;
  posttest_totle: number;
}

export interface StudentData {
  id: string;
  username: string;
  enrolledAt: Timestamp; // formatted date
}

export interface Student {
  id: string;
  username: string;
  enrolledAt: string; // formatted date
}
