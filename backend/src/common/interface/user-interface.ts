import { Courses } from './couse-interface';

export interface UserData {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface UserDataWithCourses {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  courses: Courses[];
}

export interface User {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };
}
