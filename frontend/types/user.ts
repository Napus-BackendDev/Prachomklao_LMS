export type User = {
    id: string,
    username: string,
    email: string,
    role: 'Student' | 'Admin',
    courses: {
        id: string,
        title: string,
        enrollment: string,
        status: 'In progress' | 'Completed',
    }[]
}