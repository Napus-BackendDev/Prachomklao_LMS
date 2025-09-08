import { Courses } from './couse-type';

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
    email: string;
    username: string;
    role: string;
  };
}
