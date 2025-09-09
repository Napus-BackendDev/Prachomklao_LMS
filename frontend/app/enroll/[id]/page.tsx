"use client"

import useCourses from "@/hooks/useCourses";
import { Course } from "@/types/couse";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnrollCoursePage() {
    const { fetchCourseById } = useCourses();
    const pathName = usePathname();

    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const path = pathName.split("/").pop()
            if (path) {
                const course = await fetchCourseById(path);
                setCourse(course);
            }
        };

        fetchData();
    }, [pathName]);

    return (
        <div>

        </div>
    )
}