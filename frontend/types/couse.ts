import { Student } from "./student"

export type Course = {
    id: string,
    code: string,
    title: string,
    urlPicture: string
    url: string,
    students: Record<string, Student>,
    pretest: Record<string, string>,
    posttest: Record<string, string>,
    pretest_Totle: number,
    posttest_Totle: number
}