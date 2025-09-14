import { Test } from "./test";

export type Courses = {
  id: string,
  title: string,
  urlPicture: string,
  url: string,
};

export type EnrolledCourse = {
  id: string,
  title: string,
  urlPicture: string,
  enrolledAt: string,
  status: string,
  progress: {
    current: number,
    total: number,
  }
}

export type CourseData = {
  courses: {
    id: string,
    title: string,
    url: string,
    urlPicture: string,
    content: Courses[],
  },
  students: {
    id: string,
    username: string,
    enrolledAt: string,
  },
  pretest: Test[],
  posttest: Test[],
  pretest_totle: number,
  posttest_totle: number,
}