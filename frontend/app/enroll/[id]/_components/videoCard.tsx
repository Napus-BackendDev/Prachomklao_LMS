import React from "react";
import { Button } from "@heroui/react";
import { Courses } from "@/types/couses";

type VideoCardProps = {
    course: {
        id: string;
        title: string;
        url: string;
        urlPicture: string;
        content?: Courses[];
    };
    currentStep: number;
    stepLength: number;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
}

export default function VideoCard({
    course,
    currentStep,
    stepLength,
    handlePreviousStep,
    handleNextStep
}: VideoCardProps) {
    return (
        <div className="flex flex-col items-center gap-12 p-4">
            <div className="w-full max-w-4xl">
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        className="w-full h-full"
                        src={course.url.replace("watch?v=", "embed/")}
                        allowFullScreen
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mx-auto mt-6">
                <Button
                    radius="sm"
                    isDisabled={currentStep === 2}
                    onPress={handlePreviousStep}
                    className="w-20 mx-auto hover:bg-primary hover:text-white"
                >
                    บทก่อนหน้า
                </Button>
                <Button
                    radius="sm"
                    onPress={handleNextStep}
                    className="w-20 mx-auto hover:bg-primary hover:text-white"
                >
                    {currentStep === (stepLength - 1)
                        ? "ทำบททดสอบ"
                        : "บทต่อไป"
                    }
                </Button>
            </div>
        </div >
    );
};