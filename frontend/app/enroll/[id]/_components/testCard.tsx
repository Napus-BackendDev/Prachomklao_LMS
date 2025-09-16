import { useState } from "react";
import { Button, cn, Divider, Radio, RadioGroup } from "@heroui/react"; // ตัวอย่าง HeroUI ใช้ Chakra-like components
import { Test } from "@/types/test";

interface TestCardProps {
  title: string;
  tests: Test[];
  onSubmit: (answers: { question: string; answer: string }[]) => void;
}

export default function TestCard({ title, tests, onSubmit }: TestCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);

  const currentQuestion = tests[currentIndex];

  const handleAnswer = (question: string, value: string) => {
    setAnswers((prev) => {
      const existingItem = prev.findIndex((item) => item.question === question);

      if (existingItem !== -1) {
        const updated = [...prev];
        updated[existingItem] = { question, answer: value };
        return updated;
      } else {
        return [...prev, { question, answer: value }];
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < tests.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div
      className="max-w-screen-lg mx-auto bg-blue-100  p-16 rounded-2xl shadow-lg"
    >
      <div className="max-w-screen-sm mx-auto">
        {/* Title */}
        <p className="text-3xl font-bold text-center mb-4">{title}</p>

        {/* Questions */}
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold text-default-500">
            คำถามที่ {currentIndex + 1}
          </p>
          <p className="text-xl font-semibold">
            {currentQuestion?.question}
          </p>
          <Divider className="rounded-full h-0.5 w-md mx-auto my-8" />
          <RadioGroup
            key={currentQuestion?.question}
            className="flex justify-center items-center"
            value={answers[currentIndex]?.answer}
            onValueChange={(value) => handleAnswer(currentQuestion.question, value)}
          >
            <div className="grid grid-cols-2 gap-8">
              {currentQuestion?.options.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  classNames={{
                    base: cn(
                      "bg-white hover:bg-white/50 items-center",
                      "min-w-xs cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary",
                    ),
                  }}
                >
                  {option}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mx-auto mt-6">
          <Button
            radius="sm"
            className="hover:bg-primary hover:text-white"
            onPress={handlePrevious}
            isDisabled={currentIndex === 0}
          >
            ข้อก่อนหน้า
          </Button>

          {currentIndex === tests.length - 1 ? (
            <Button
              radius="sm"
              className="hover:bg-primary hover:text-white"
              onPress={() => onSubmit(answers)}
              isDisabled={answers.length !== tests.length}
            >
              ส่งคำตอบ
            </Button>
          ) : (
            <Button
              radius="sm"
              className="hover:bg-primary hover:text-white"
              onPress={handleNext}
            >
              ข้อต่อไป
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
