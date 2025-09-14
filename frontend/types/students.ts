import { Courses } from "./couses"

export type Students = {
    id: string,
    email: string,
    username: string,
    password: string,
    role: string,
    courses: Courses[],
}