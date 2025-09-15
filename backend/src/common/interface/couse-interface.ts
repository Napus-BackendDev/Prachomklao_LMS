import { Timestamp } from 'firebase-admin/firestore';
import { PosttestQuestion } from './posttest-interface';
import { PretestQuestion } from './pretest-interface';

export interface Courses {
  id?: string;
  title?: string;
  courseCode?: string;
  url?: string;
  urlPicture?: string;
  totalStudent?: number;
  content?: content[];
}

interface content {
  id?: string;
  title?: string;
  url?: string;
  urlPicture?: string;
}

export interface CourseDetail {
  Courses: Courses;
  students: Student[];
  totalStudent: number;
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
