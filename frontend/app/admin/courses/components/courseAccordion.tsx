import { Content } from "@/types/content";
import { Accordion, AccordionItem, Button, Input } from "@heroui/react";
import { Trash } from "lucide-react";

type CourseAccordionProps = {
    content: Content[];
    onAddContent: () => void;
    onRemoveContent: (index: number) => void;
    onContentChange: (index: number, field: keyof Content, value: string) => void;
}

export default function CourseAccordion({
    content,
    onAddContent,
    onRemoveContent,
    onContentChange,
}: CourseAccordionProps) {
    return (
        <Accordion selectionMode="multiple" variant="splitted" keepContentMounted>
            {/* Content */}
            <AccordionItem
                key="content"
                aria-label="Content Accordion"
                title="Content"
                className="font-bold"
            >
                <div className="space-y-4">
                    {content.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input
                                aria-label={`Content Title ${index + 1}`}
                                label="Content Title"
                                value={item.title}
                                onValueChange={(val) => onContentChange(index, "title", val)}
                                placeholder="ชื่อบทเรียน"
                                className="flex-1"
                            />
                            <Input
                                aria-label={`Content URL ${index + 1}`}
                                label="Content URL"
                                value={item.url}
                                onValueChange={(val) => onContentChange(index, "url", val)}
                                placeholder="ลิงก์บทเรียน"
                                className="flex-1"
                            />
                            {content.length > 1 && (
                                <Button
                                    aria-label={`Delete Content ${index + 1}`}
                                    isIconOnly
                                    color="danger"
                                    variant="light"
                                    onPress={() => onRemoveContent(index)}
                                >
                                    <Trash size="20" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button aria-label="Add Content" color="primary" variant="flat" onPress={onAddContent}>
                        + เพิ่ม Content
                    </Button>
                </div>
            </AccordionItem>
        </Accordion>
    )
}