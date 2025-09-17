import { Skeleton } from "@heroui/react";

export default function EnrollCourseSkeleton() {
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