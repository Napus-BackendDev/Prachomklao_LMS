import { Skeleton } from "@heroui/react";

export default function TestCardSkeleton() {
    return (
        <div className="max-w-screen-2xl mx-auto py-8 space-y-20">
            {/* Progress bar */}
            <div className="relative px-6">
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

            {/* Test Card */}
            <div className="max-w-screen-lg mx-auto bg-[#E9EFF8] p-16 rounded-2xl shadow-lg">
                <div className="max-w-screen-sm mx-auto flex flex-col gap-6">
                    <Skeleton className="h-8 w-1/2 mx-auto rounded-lg" />
                    <Skeleton className="h-6 w-1/4 rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-0.5 w-full rounded-full my-8" />
                    <div className="grid grid-cols-2 gap-8">
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