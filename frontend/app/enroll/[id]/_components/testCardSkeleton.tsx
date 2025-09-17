import { Skeleton } from "@heroui/react";
import ProgressBarSkeleton from "./progressBarSkeleton";

export default function TestCardSkeleton() {
    return (
        <div className="max-w-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-2xl mx-auto mx-auto py-8 space-y-20">
            {/* Progress bar */}
            <ProgressBarSkeleton />

            {/* Test Card */}
            <div className="max-w-screen-lg mx-auto bg-[#E9EFF8] p-16 rounded-2xl shadow-lg">
                <div className="max-w-screen-sm mx-auto flex flex-col gap-6">
                    <Skeleton className="h-8 w-1/2 mx-auto rounded-lg" />
                    <Skeleton className="h-6 w-1/4 rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-0.5 w-full rounded-full my-8" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 rounded-lg" />
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <Skeleton className="h-10 w-28 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}