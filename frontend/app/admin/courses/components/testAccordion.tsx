import { Test } from "@/types/test";
import { Accordion, AccordionItem, Button, Divider, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TestAccordionProps = {
    pretest: Test[];
    setPretest: Dispatch<SetStateAction<{ question: string; options: string[]; correctAnswer: string; }[]>>;
    posttest: Test[];
    setPosttest: Dispatch<SetStateAction<{ question: string; options: string[]; correctAnswer: string; explanation?: string; }[]>>;
    setDeleted: Dispatch<SetStateAction<{ pretest: string[]; posttest: string[] }>>;
}

export default function TestAccordion({ pretest, setPretest, posttest, setPosttest, setDeleted } : TestAccordionProps) {
    return (
        <Accordion selectionMode="multiple" variant="splitted" keepContentMounted>
            <AccordionItem
                key="pretest"
                aria-label="Pretest Accordion"
                title="Pretest"
                className="font-bold"
            >
                <div className="space-y-4">
                    {pretest.map((test, testIndex) => (
                        <div key={testIndex} className="rounded-lg space-y-4">
                            {/* Question */}
                            <div>
                                <p>{`Question ${testIndex + 1}`}</p>
                                <Input
                                    aria-label={`Pretest Question ${testIndex + 1}`}
                                    value={test.question}
                                    onValueChange={(val) => {
                                        const newPretest = [...pretest];
                                        newPretest[testIndex].question = val;
                                        setPretest(newPretest);
                                    }}
                                    placeholder="คำถาม"
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                <p>Options</p>
                                {test.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex gap-2 items-center">
                                        <Input
                                            aria-label={`Pretest Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                            value={option}
                                            onValueChange={(val) => {
                                                const newPretest = [...pretest];
                                                newPretest[testIndex].options[optionIndex] = val;
                                                setPretest(newPretest);
                                            }}
                                            placeholder={`ตัวเลือก ${optionIndex + 1}`}
                                            className="flex-1"
                                        />
                                        {test.options.length > 1 && (
                                            <Button
                                                aria-label={`Delete Pretest Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                                isIconOnly
                                                color="danger"
                                                variant="light"
                                                onPress={() => {
                                                    const newPretest = [...pretest];
                                                    newPretest[testIndex].options.splice(optionIndex, 1);
                                                    if (newPretest[testIndex].correctAnswer === option) {
                                                        newPretest[testIndex].correctAnswer = "";
                                                    }
                                                    setPretest(newPretest);
                                                }}
                                            >
                                                <Trash size={20} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    aria-label={`Add Pretest Option for Question ${testIndex + 1}`}
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onPress={() => {
                                        const newPretest = [...pretest];
                                        newPretest[testIndex].options.push("");
                                        setPretest(newPretest);
                                    }}
                                >
                                    + เพิ่มตัวเลือก
                                </Button>
                            </div>

                            {/* Correct Answer */}
                            <div>
                                <p>Correct Answer</p>
                                <Select
                                    aria-label={`Pretest Correct Answer for Question ${testIndex + 1}`}
                                    selectedKeys={test.correctAnswer ? [test.correctAnswer] : []}
                                    onChange={(e) => {
                                        const newPretest = [...pretest];
                                        newPretest[testIndex].correctAnswer = e.target.value;
                                        setPretest(newPretest);
                                    }}
                                    placeholder="เลือกคำตอบที่ถูกต้อง"
                                    className="w-full"
                                >
                                    {test.options.map((option, optionIndex) => (
                                        <SelectItem
                                            key={option}
                                            aria-label={`Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                        >
                                            {option || `Option ${optionIndex + 1}`}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            {/* Delete Question */}
                            {pretest.length > 0 && (
                                <Button
                                    aria-label={`Delete Pretest Question ${testIndex + 1}`}
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        const newPretest = [...pretest];
                                        newPretest.splice(testIndex, 1);
                                        setPretest(newPretest);
                                        
                                        if (test.id) {
                                            setDeleted(prev => ({
                                                ...prev,
                                                pretest: [...prev.pretest, test.id! ]
                                            }))
                                        };
                                    }}
                                >
                                    ลบคำถามนี้
                                </Button>
                            )}
                            <Divider />
                        </div>
                    ))}
                    <Button aria-label="Add Pretest Question" color="primary" variant="flat" onPress={() => {
                        setPretest([
                            ...pretest,
                            { question: "", options: [""], correctAnswer: "" },
                        ]);
                    }}>
                        + เพิ่มคำถาม
                    </Button>
                </div>
            </AccordionItem>

            <AccordionItem
                key="posttest"
                aria-label="Posttest Accordion"
                title="Posttest"
                className="font-bold"
            >
                <div className="space-y-4">
                    {posttest.map((test, testIndex) => (
                        <div key={testIndex} className="rounded-lg space-y-4">
                            {/* Question */}
                            <div>
                                <p>{`Question ${testIndex + 1}`}</p>
                                <Input
                                    aria-label={`Posttest Question ${testIndex + 1}`}
                                    value={test.question}
                                    onValueChange={(val) => {
                                        const newPosttest = [...posttest];
                                        newPosttest[testIndex].question = val;
                                        setPosttest(newPosttest);
                                    }}
                                    placeholder="คำถาม"
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                <p>Options</p>
                                {test.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex gap-2 items-center">
                                        <Input
                                            aria-label={`Posttest Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                            value={option}
                                            onValueChange={(val) => {
                                                const newPosttest = [...posttest];
                                                newPosttest[testIndex].options[optionIndex] = val;
                                                setPosttest(newPosttest);
                                            }}
                                            placeholder={`ตัวเลือก ${optionIndex + 1}`}
                                            className="flex-1"
                                        />
                                        {test.options.length > 1 && (
                                            <Button
                                                aria-label={`Delete Posttest Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                                isIconOnly
                                                color="danger"
                                                variant="light"
                                                onPress={() => {
                                                    const newPosttest = [...posttest];
                                                    newPosttest[testIndex].options.splice(optionIndex, 1);
                                                    if (newPosttest[testIndex].correctAnswer === option) {
                                                        newPosttest[testIndex].correctAnswer = "";
                                                    }
                                                    setPosttest(newPosttest);
                                                }}
                                            >
                                                <Trash size={20} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    aria-label={`Add Posttest Option for Question ${testIndex + 1}`}
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onPress={() => {
                                        const newPosttest = [...posttest];
                                        newPosttest[testIndex].options.push("");
                                        setPosttest(newPosttest);
                                    }}
                                >
                                    + เพิ่มตัวเลือก
                                </Button>
                            </div>

                            {/* Correct Answer */}
                            <div>
                                <p>Correct Answer</p>
                                <Select
                                    aria-label={`Posttest Correct Answer for Question ${testIndex + 1}`}
                                    selectedKeys={test.correctAnswer ? [test.correctAnswer] : []}
                                    onChange={(e) => {
                                        const newPosttest = [...posttest];
                                        newPosttest[testIndex].correctAnswer = e.target.value;
                                        setPosttest(newPosttest);
                                    }}
                                    placeholder="เลือกคำตอบที่ถูกต้อง"
                                    className="w-full"
                                >
                                    {test.options.map((option, optionIndex) => (
                                        <SelectItem
                                            key={option}
                                            aria-label={`Option ${optionIndex + 1} for Question ${testIndex + 1}`}
                                        >
                                            {option || `Option ${optionIndex + 1}`}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            {/* Explanation */}
                            <div>
                                <p>Explanation</p>
                                <Textarea
                                    aria-label={`Explanation for Posttest Question ${testIndex + 1}`}
                                    rows={3}
                                    placeholder="คำอธิบายเพิ่มเติม"
                                    value={test.explanation || ""}
                                    onChange={(e) => {
                                        const newPosttest = [...posttest];
                                        newPosttest[testIndex].explanation = e.target.value;
                                        setPosttest(newPosttest);
                                    }}
                                />
                            </div>

                            {/* Delete question */}
                            {posttest.length > 0 && (
                                <Button
                                    aria-label={`Delete Posttest Question ${testIndex + 1}`}
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        const newPosttest = [...posttest];
                                        newPosttest.splice(testIndex, 1);
                                        setPosttest(newPosttest);

                                        if (test.id) {
                                            setDeleted(prev => ({
                                                ...prev,
                                                posttest: [...prev.posttest, test.id! ]
                                            }))
                                        };
                                    }}
                                >
                                    ลบคำถามนี้
                                </Button>
                            )}
                            <Divider />
                        </div>
                    ))}
                    <Button
                        aria-label="Add Posttest Question"
                        color="primary"
                        variant="flat"
                        onPress={() => {
                            setPosttest([
                                ...posttest,
                                { question: "", options: [], correctAnswer: "", explanation: "" },
                            ]);
                        }}
                    >
                        + เพิ่มคำถาม
                    </Button>
                </div>
            </AccordionItem>
        </Accordion>
    )
}