import { Courses } from './couse-interface';

export interface UserData {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface UserDataWithCourses {
  id: string;
  email: string;
  username: string;
  role: string;
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
