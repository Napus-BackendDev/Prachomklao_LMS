export type Grade = {
    message: string,
    score: number,
    total: number,
}

export type Result = {
    id: string,
    question: string,
    answer: string,
    correctAnswer: string,
    options: string[],
}

export type AnswerResult = {
    message: string,
    result: Result[],
}