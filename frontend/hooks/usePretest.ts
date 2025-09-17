import { Grade } from "@/types/grade";
import { useState } from "react";

export default function usePretest() {
    const [grade, setGrade] = useState<Grade>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPretestGrade = async (coursesId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/courses/${coursesId}/answer/pretest`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch pre-test grade");
            } else {
                setGrade(data);
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch pre-test grade"
                    : "Failed to fetch pre-test grade"
            );
        } finally {
            setLoading(false);
        }
    };

    const createPretestAnswer = async (answers: { question: string; answer: string }[], courseId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/courses/${courseId}/answer/pretest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answers),
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to submit pre-test");
            } else {
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to submit pre-test"
                    : "Failed to submit pre-test"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        grade,
        error,
        loading,
        fetchPretestGrade,
        createPretestAnswer,
    }
}