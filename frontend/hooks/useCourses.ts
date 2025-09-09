import { useEffect, useState } from "react";

export default function useCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/courses`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch courses")
            } else {
                setCourses(data);
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch courses"
                    : "Failed to fetch courses"
            );
        } finally {
            setLoading(false);
        }
    }

    const fetchCourseById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/courses/${id}`, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch this course")
            } else {
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch this course"
                    : "Failed to fetch this course"
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return {
        courses,
        error,
        loading,
        fetchCourseById,
    }
} 