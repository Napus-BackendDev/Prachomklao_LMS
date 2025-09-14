import { EnrolledCourse } from "@/types/couses";
import { useState, useEffect } from "react";

export default function useEnroll() {
    const [enrolled, setEnrolled] = useState<EnrolledCourse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEnrolled = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/student/courses/enroll`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch enrolled courses");
            } else {
                setEnrolled(data);
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch enrolled courses"
                    : "Failed to fetch enrolled courses"
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchEnrolledById = async (courseId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/student/courses/enroll/${courseId}`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch enrolled courses");
            } else {
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch enrolled courses"
                    : "Failed to fetch enrolled courses"
            );
        } finally {
            setLoading(false);
        }
    };

    const createEnroll = async (courseId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/student/courses/enroll/${courseId}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to enroll course");
            } else {
                await fetchEnrolled();
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to enroll course"
                    : "Failed to enroll course"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateEnrollProgress = async (courseId: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/student/courses/enroll/progress/${courseId}`, {
                method: "PATCH",
                credentials: "include",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update progress");
            } else {
                await fetchEnrolled();
                return data;
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to update progress"
                    : "Failed to update progress"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrolled();
    }, []);

    return {
        enrolled,
        error,
        loading,
        fetchEnrolled,
        createEnroll,
        fetchEnrolledById,
        updateEnrollProgress,
    };
}
