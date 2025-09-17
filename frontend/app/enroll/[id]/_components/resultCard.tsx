import { Result } from "@/types/grade";
import { Button, Card, cn, Divider, ScrollShadow } from "@heroui/react";

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
                        <div className="grid md:grid-cols-2 gap-4 my-4">
                            {result.options.map((option) => (
                                <Card
                                    key={option}
                                    classNames={{
                                        base: cn(
                                            "bg-default-100  rounded-lg gap-4 p-4 border-2 border-transparent",
                                            result.correctAnswer === option
                                                ? (result.correctAnswer === result.answer ? "bg-success/90" : "bg-danger/90")
                                                : ""
                                        ),
                                    }}
                                >
                                    {option}
                                </Card>
                            ))}
                        </div>
                        <div className="flex gap-2 text-xl font-semibold">
                            <p className="text-primary whitespace-nowrap">ข้อที่ถูกต้อง :</p>
                            <p>{result.correctAnswer}</p>
                        </div>
                        {result.explanation && (
                            <p className="text-lg text-warning">{result.explanation}</p>
                        )}
                        <Divider className="rounded-full h-0.5 mx-auto my-8" />
                    </div>
                ))}
            </ScrollShadow>

            <Button
                radius="sm"
                variant="ghost"
                color="primary"
                className="w-20 mx-auto border-0 bg-primary/10"
                onPress={handleNextStep}
            >
                ต่อไป
            </Button>
        </Card>
    )
}