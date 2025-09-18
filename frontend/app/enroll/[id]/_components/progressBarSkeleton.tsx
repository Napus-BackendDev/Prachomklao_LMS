import { Skeleton } from "@heroui/react";

export default function ProgressBarSkeleton() {
    return (
        <div className="max-w-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto relative px-6">
            <Skeleton className="h-3 rounded-full w-full" />
            <div className="absolute top-0 left-0 w-full flex justify-between">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center w-8 -translate-y-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-16 mt-2 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    )
}