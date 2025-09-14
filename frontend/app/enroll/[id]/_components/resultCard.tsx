import { Result } from "@/types/grade";
import { Button, Card, cn, Divider, Radio, RadioGroup, ScrollShadow } from "@heroui/react";

type ResultCardProps = {
    results: Result[];
    handleNextStep: () => void;
}

export default function ResultCard({ results, handleNextStep }: ResultCardProps) {
    return (
        <Card className="max-w-screen-md h-full mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">ผลการทำแบบทดสอบ</h2>
            <ScrollShadow className="h-[400px]">
                {results.map((result, index) => (
                    <div key={result.id} className="px-4">
                        <p className="text-xl font-semibold text-default-500">
                            คำถามที่ {index + 1}
                        </p>
                        <p className="text-xl font-semibold">
                            {result.question}
                        </p>
                        <div className="grid grid-cols-2 gap-8 my-4">
                            {result.options.map((option) => (
                                <Card
                                    key={option}
                                    classNames={{
                                        base: cn(
                                            "bg-default-100 min-w-xs rounded-lg gap-4 p-4 border-2 border-transparent",
                                            result.correctAnswer === option ? "bg-success/90" : null,
                                            result.answer === option && result.answer !== result.correctAnswer ? "bg-danger/90" : null,
                                        ),
                                    }}
                                >
                                    {option}
                                </Card>
                            ))}
                        </div>
                        <Divider className="rounded-full h-0.5 mx-auto my-8" />
                    </div>
                ))}
            </ScrollShadow>

            <Button
                onPress={handleNextStep}
                color="primary"
                variant="ghost"
                className="w-20 mx-auto"
            >
                Next
            </Button>
        </Card>
    )
}