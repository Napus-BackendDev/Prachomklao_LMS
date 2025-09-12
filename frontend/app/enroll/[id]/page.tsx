"use client"

import useCourses from "@/hooks/useCourses";
import { Course } from "@/types/couse";
import { Progress } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "./_components/progressBar";

export default function EnrollCoursePage() {
    const { fetchCourseById } = useCourses();
    const pathName = usePathname();
    const courseId = pathName.split("/").pop()

    const [course, setCourse] = useState<Course | null>(null);
    let currentStep = 1;

    const steps = [
        { id: 1, title: "PRE-TEST" },
        { id: 2, title: course?.title ?? "MAIN" },
        ...(course?.content.map((_, index) => ({
            id: (index + 1) + 2, title: `LESSON ${index + 1}`
        })) ?? []),
        { id: (course?.content.length ?? 0) + 1, title: "POST-TEST" },
    ];
    const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

    useEffect(() => {
        const fetchData = async () => {
            if (courseId) {
                const res = await fetchCourseById(courseId);
                setCourse(res);
            }
        };

        fetchData();
    }, [pathName]);


    return (
        <div className="max-w-screen-2xl mx-auto py-8">
            {/* Progress Bar */}
            <ProgressBar
                currentStep={currentStep}
                progressValue={progressValue}
                steps={steps}
            />


        </div>
    )
}