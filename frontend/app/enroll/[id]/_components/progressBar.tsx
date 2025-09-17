import { Progress } from "@heroui/react";

type ProgressBarProps = {
    currentStep: number,
    progressValue: number,
    steps: {
        id: number;
        title: string;
    }[],
}

export default function ProgressBar({ currentStep, progressValue, steps }: ProgressBarProps) {
    return (
        <>
            {/* Progress bar */}
            <div className="relative px-6">
                <Progress
                    aria-label="progress"
                    value={progressValue}
                    className="h-3 rounded-full"
                    color="primary"
                />

                {/* Checkpoints */}
                <div className="absolute top-0 left-0 w-full flex justify-between">
                    {steps.map((step) => {
                        const isActive = step.id <= currentStep;
                        return (
                            <div
                                key={step.id}
                                className="flex flex-col items-center w-8 -translate-y-2"
                            >
                                {/* Circle */}
                                <div
                                    className={`
                                        size-8 rounded-full flex items-center justify-center text-md font-bold 
                                        ${isActive ? "bg-primary text-white" : "bg-gray-300 text-gray-600"}
                                    `}
                                >
                                    {step.id}
                                </div>
                                {/* Title */}
                                <span className={`w-10 md:w-20 xl:w-50 text-center text-xl font-bold truncate ${isActive ? "text-primary" : ""}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}