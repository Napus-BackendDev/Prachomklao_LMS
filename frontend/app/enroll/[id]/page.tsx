"use client"

import useCourses from "@/hooks/useCourses";
import { CourseData } from "@/types/couses"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "./_components/progressBar";
import TestCard from "./_components/testCard";
import usePretest from "@/hooks/usePretest";
import usePosttest from "@/hooks/usePosttest";
import { Result } from "@/types/grade";
import ResultCard from "./_components/resultCard";
import VideoCard from "./_components/videoCard";
import EnrollCourseSkeleton from "./_components/enrollCourseSkeleton";
import useEnroll from "@/hooks/useEnroll";

export default function EnrollCoursePage() {
    const { fetchCourseById, loading: coursesLoading } = useCourses();
    const { createPretestAnswer, loading: pretestLoading } = usePretest();
    const { createPosttestAnswer, loading: posttestLoading } = usePosttest();
    const { updateEnrollProgress, loading: enrolledLoading } = useEnroll();
    const pathName = usePathname();
    const router = useRouter();
    const courseId = pathName.split("/").pop()

    const [course, setCourse] = useState<CourseData>();
    const [currentStep, setCurrentStep] = useState(1);
    const [pretestResult, setPretestResult] = useState<Result[] | null>(null);
    const [posttestResult, setPosttestResult] = useState<Result[] | null>(null);
    const isLoading = coursesLoading || pretestLoading || posttestLoading || enrolledLoading;

    const steps = [
        { id: 1, title: "PRE-TEST" },
        { id: 2, title: course?.courses.title ?? "MAIN" },
        ...(course?.courses.content.map((_, index) => ({
            id: (index + 1) + 2, title: `LESSON ${index + 1}`
        })) ?? []),
        { id: (course?.courses.content.length ?? 0) + 3, title: "POST-TEST" },
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
    }, [courseId]);

    const handleSubmit = async (answers: { question: string; answer: string }[]) => {
        if (!course?.courses.id) return;

        if (currentStep === 1) {
            const res = await createPretestAnswer(answers, course?.courses.id);
            setPretestResult(res.result);
        } else {
            const res = await createPosttestAnswer(answers, course.courses.id);
            setPosttestResult(res.result);
        }
    }

    const handleNext = async () => {
        if (!courseId) return;

        await updateEnrollProgress(courseId);
        setCurrentStep(prev => prev + 1);
    }

    if (isLoading) return <EnrollCourseSkeleton />

    return (
        <div className="max-w-screen-2xl mx-auto py-8 space-y-20">
            {/* Progress Bar */}
            <ProgressBar
                currentStep={currentStep}
                progressValue={progressValue}
                steps={steps}
            />

            {/* Pre-Test */}
            {currentStep === 1 && pretestResult
                ? (
                    // Pre-test Result
                    <ResultCard
                        results={pretestResult}
                        handleNextStep={handleNext}
                    />
                ) : (
                    // Pre-test Test
                    (currentStep === 1 && course?.pretest) && (
                        <TestCard
                            title="แบบทดสอบก่อนเรียน"
                            tests={course?.pretest}
                            onSubmit={(answers: { question: string; answer: string }[]) => handleSubmit(answers)}
                        />
                    )
                )
            }

            {/* Main */}
            {(course && currentStep === 2)
                && (
                    <VideoCard
                        course={course.courses}
                        currentStep={currentStep}
                        stepLength={steps.length}
                        handlePreviousStep={() => setCurrentStep(prev => prev - 1)}
                        handleNextStep={handleNext}
                    />
                )
            }

            {/* Lessons */}
            {(course && currentStep > 2 && currentStep < (course?.courses.content.length ?? 0) + 3 && course.courses.content[currentStep - 3])
                && (
                    <VideoCard
                        course={course.courses.content[currentStep - 3]}
                        currentStep={currentStep}
                        stepLength={steps.length}
                        handlePreviousStep={() => setCurrentStep(prev => prev - 1)}
                        handleNextStep={handleNext}
                    />
                )
            }

            {/* Post-test */}
            {currentStep === steps.length && posttestResult
                ? (
                    // Post-test Result
                    <ResultCard
                        results={posttestResult}
                        handleNextStep={() => {
                            currentStep === steps.length
                                ? router.replace('/')
                                : setCurrentStep(prev => prev + 1)
                        }}
                    />
                ) : (
                    // Post-test Test
                    (currentStep === steps.length && course?.posttest) && (
                        <TestCard
                            title="แบบทดสอบหลังเรียน"
                            tests={course?.posttest}
                            onSubmit={(answers: { question: string; answer: string }[]) => handleSubmit(answers)}
                        />
                    )
                )
            }
        </div>
    )
}