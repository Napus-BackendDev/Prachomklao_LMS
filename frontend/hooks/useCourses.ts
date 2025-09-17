import { Content, MainContent } from "@/types/content";
import { Courses } from "@/types/couses";
import { useEffect, useState } from "react";

export default function useCourses() {
    const [courses, setCourses] = useState<Courses[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch this course")
            }

            return data;
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

    const createCourse = async (course: (MainContent | Content[])) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course),
                credentials: "include"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create course")
            }

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to create course"
                    : "Failed to create course"
            )
        } finally {
            setLoading(false);
        }
    }

    const updateCourse = async (courseId: string, course: Courses) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(course),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update course");
            }

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to update course"
                    : "Failed to update course"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateContent = async (courseId: string, contentId: string, content: Content,) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/content/${contentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(content),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update course content");
            }

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to update course content"
                    : "Failed to update course content"
            );
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete this course")
            } else {
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to delete this course"
                    : "Failed to delete this course"
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
        fetchCourses,
        fetchCourseById,
        createCourse,
        updateCourse,
        updateContent,
        deleteCourse,
    }
} 