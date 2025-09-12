import { Content } from "./content"
import { Student } from "./student"
import { Test } from "./test"

export type Course = {
    id: string,
    title: string,
    urlPicture: string,
    url: string,
    students?: Record<string, Student>,
    pretest?: Record<string, Test>,
    posttest?: Record<string, Test>,
    content?: Content[],
    pretest_Totle?: number,
    posttest_Totle?: number,
    status?: string,
    enrolledAt?: Date;
}