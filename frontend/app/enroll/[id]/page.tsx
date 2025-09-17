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
import TestCardSkeleton from "./_components/testCardSkeleton";

export default function EnrollCoursePage() {
    const { fetchCourseById, loading: coursesLoading } = useCourses();
    const { createPretestAnswer, loading: pretestLoading } = usePretest();
    const { createPosttestAnswer, loading: posttestLoading } = usePosttest();
    const { fetchEnrolledById, updateEnrollProgress, loading: enrolledLoading } = useEnroll();
    const pathName = usePathname();
    const router = useRouter();
    const courseId = pathName.split("/").pop()

    const [course, setCourse] = useState<CourseData>();
    const [currentStep, setCurrentStep] = useState(7);
    const [pretestResult, setPretestResult] = useState<Result[] | null>(null);
    const [posttestResult, setPosttestResult] = useState<Result[] | null>(null);
    const isLoading = coursesLoading || pretestLoading || posttestLoading || enrolledLoading;

    const steps: { id: number; title: string; uid: string; }[] = [];
    if (course?.pretest_totle) {
        steps.push({
            id: steps.length + 1,
            title: "Pre-Test",
            uid: "pretest"
        })
    };
    steps.push({
        id: steps.length + 1,
        title: course?.courses?.title ?? "Lesson 1",
        uid: "Lesson 1"
    })
    course?.courses?.content?.map((lesson, index) => {
        steps.push({
            id: steps.length + 1,
            title: lesson.title ?? `Lesson ${index + 2}`,
            uid: `Lesson ${index + 2}`
        })
    })
    if (course?.posttest_totle) {
        steps.push({
            id: steps.length + 1,
            title: "Post-Test",
            uid: "posttest"
        });
    }

    const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

    useEffect(() => {
        if (!courseId) return;

        const fetchData = async () => {
            const course = await fetchCourseById(courseId);
            setCourse(course);

            // const enrolled = await fetchEnrolledById(courseId);
            // setCurrentStep(enrolled.progress.current);
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

    if (isLoading) return (currentStep !== 1) && (currentStep !== steps.length) ? <EnrollCourseSkeleton /> : <TestCardSkeleton />

    return (
        <div className="max-w-screen-2xl mx-auto py-8 space-y-30">
            {/* Progress Bar */}
            <ProgressBar
                currentStep={currentStep}
                progressValue={progressValue}
                steps={steps}
            />

            {/* Pre-Test */}
            {steps[currentStep - 1]?.uid === "pretest"
                ? pretestResult
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
                : null
            }

            {/* Main */}
            {(course && currentStep === 2 && course.courses.id)
                && (
                    <VideoCard
                        course={{
                            ...course.courses,
                            id: course.courses.id as string,
                            urlPicture: course.courses.urlPicture ?? ""
                        }}
                        currentStep={currentStep}
                        stepLength={steps.length}
                        handlePreviousStep={() => setCurrentStep(prev => prev - 1)}
                        handleNextStep={handleNext}
                    />
                )
            }

            {/* Lessons */}
            {(course && currentStep > 2 && currentStep < (course?.courses.content?.length ?? 0) + 3 && course.courses.content?.[currentStep - 3])
                && (
                    <VideoCard
                        course={{
                            id: course.courses.content[currentStep - 3]?.id ?? "",
                            title: course.courses.content[currentStep - 3]?.title ?? "",
                            url: course.courses.content[currentStep - 3]?.url ?? "",
                            urlPicture: course.courses.content[currentStep - 3]?.urlPicture ?? ""
                        }}
                        currentStep={currentStep}
                        stepLength={steps.length}
                        handlePreviousStep={() => setCurrentStep(prev => prev - 1)}
                        handleNextStep={handleNext}
                    />
                )
            }

            {/* Post-test */}
            {steps[currentStep - 1]?.uid === "posttest"
                ? posttestResult
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
                : null
            }
        </div>
    )
}