import React, { useCallback } from "react";
import YouTube from "react-youtube";
import { Button } from "@heroui/react";
import { Courses } from "@/types/couses";

type VideoCardProps = {
    course: Courses;
    currentStep: number;
    nextDisabled: boolean;
    handlePreviousStep: () => void;
    handleNextStep: () => void;
    setNextDisabled: (enabled: boolean) => void;
}

export default function VideoCard({
    course,
    currentStep,
    nextDisabled,
    handlePreviousStep,
    handleNextStep,
    setNextDisabled,
}: VideoCardProps) {
    const handleVideoEnd = () => {
        setNextDisabled(false);
    };

    return (
        <div className="flex flex-col items-center gap-12 p-4">
            <div className="w-full max-w-4xl">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <YouTube
                        videoId={course.url.split("v=")[1]} // YouTube ID
                        opts={{
                            width: "100%",
                            height: "100%",
                            playerVars: { autoplay: 0, rel: 0 },
                        }}
                        onEnd={handleVideoEnd}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mx-auto mt-6">
                <Button
                    radius="sm"
                    isDisabled={currentStep === 1}
                    onPress={handlePreviousStep}
                    className="w-20 mx-auto hover:bg-primary hover:text-white"
                >
                    ก่อนหน้า
                </Button>
                <Button
                    radius="sm"
                    isDisabled={nextDisabled}
                    onPress={handleNextStep}
                    className="w-20 mx-auto hover:bg-primary hover:text-white"
                >
                    ต่อไป
                </Button>
            </div>
        </div >
    );
};