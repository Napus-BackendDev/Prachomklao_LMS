import { Skeleton } from "@heroui/react";
import ProgressBarSkeleton from "./progressBarSkeleton";

export default function EnrollCourseSkeleton() {
    return (
        <div className="max-w-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-2xl mx-auto mx-auto py-8 space-y-20">
            {/* Progress bar */}
            <ProgressBarSkeleton />

            {/* Video */}
            <div className="flex flex-col items-center gap-12 p-4">
                <div className="w-full max-w-4xl">
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                        <Skeleton className="w-full h-full" />
                    </div>
                    <Skeleton className="h-8 w-3/4 mt-4 rounded-lg" />
                </div>
                <div className="flex justify-center gap-4 mx-auto mt-6">
                    <Skeleton className="h-10 w-20 rounded-lg" />
                    <Skeleton className="h-10 w-20 rounded-lg" />
                </div>
            </div>
        </div>
    )
}