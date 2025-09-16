import { Content } from "./content";
import { Test } from "./test";

export type Courses = {
  id?: string,
  title: string,
  urlPicture?: string,
  url: string,
  courseCode?: string,
  content?: Content[],
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
  courses: Courses,
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