import { Grade } from "@/types/grade";
import { useState } from "react";

export default function usePosttest() {
    const [grade, setGrade] = useState<Grade>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosttestGrade = async (coursesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/courses/${coursesId}/answer/posttest`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch post-test grade");
            } else {
                setGrade(data);
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch post-test grade"
                    : "Failed to fetch post-test grade"
            );
        } finally {
            setLoading(false);
        }
    };

    const createPosttestQuestion = async (courseId: string, answers: { question: string; options: string[]; correctAnswer: string; explanation: string }[]) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/posttest/${courseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answers),
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create post-test question");
            }

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to create post-test question"
                    : "Failed to create post-test question"
            );
        } finally {
            setLoading(false);
        }
    };

    const createPosttestAnswer = async (answers: { question: string; answer: string }[], courseId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/courses/${courseId}/answer/posttest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answers),
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to submit post-test");
            } else {
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to submit post-test"
                    : "Failed to submit post-test"
            );
        } finally {
            setLoading(false);
        }
    };

    const updatePosttestQuestion = async (courseId: string, pretestId: string, answers: { question: string; options: string[]; correctAnswer: string; explanation: string }[]) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/posttest/${courseId}/${pretestId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answers),
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update post-test question");
            }

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to update post-test question"
                    : "Failed to update post-test question"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        grade,
        error,
        loading,
        fetchPosttestGrade,
        createPosttestQuestion,
        createPosttestAnswer,
        updatePosttestQuestion,
    }
}