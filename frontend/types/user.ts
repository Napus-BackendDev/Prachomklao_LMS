import { AdminCourse } from "./couses"

export type User = {
    id: string,
    username?: string,
    email: string,
    role: 'Student' | 'Admin',
    createdAt?: string,
    courses: AdminCourse[],
}

export type Profile = {
    id: string,
    username: string,
    email: string,
    role: 'Student' | 'Admin',
    createdAt?: string,
    courses?: {
        id: string,
        title: string,
        picture?: string,
        enrollment: string,
        status: 'In progress' | 'Completed',
    }[]
}