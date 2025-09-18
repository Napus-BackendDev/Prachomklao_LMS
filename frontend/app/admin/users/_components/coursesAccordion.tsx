import { AdminCourse } from "@/types/couses";
import {
    Accordion,
    AccordionItem,
    Card,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader
} from "@heroui/react";

type CoursesAccordionProps = {
    isOpen: boolean;
    onClose: () => void;
    courses: AdminCourse[];
};

export default function CoursesAccordion({
    isOpen,
    onClose,
    courses,
}: CoursesAccordionProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader><p className="text-2xl font-semibold">คอร์สที่เคยเรียน</p></ModalHeader>
                <Divider />
                <ModalBody className="max-h-[70vh]">
                    <Accordion selectionMode="multiple" variant="splitted" isCompact>
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <AccordionItem
                                    key={course.id}
                                    aria-label={course.title}
                                    title={<p className="text-xl font-semibold">{course.title}</p>}
                                    className="text-xl"
                                >
                                    <div className="space-y-2 p-2 text-xl font-semibold">
                                        <Card radius="sm" className="p-4 bg-gradient-to-l from-warning to-yellow-300">
                                            <p>Pre-Test Score: {course.pretestScore} / {course.pretestAnswers.length}</p>
                                        </Card>
                                        <Card radius="sm" className="p-4 bg-gradient-to-l from-success to-green-300">
                                            <p>Post-Test Score: {course.posttestScore} / {course.posttestAnswers.length}</p>
                                        </Card>
                                    </div>
                                </AccordionItem>
                            ))
                        ) : (
                            <AccordionItem key="empty" title="No Courses">
                                <p className="p-2 text-xl">ยังไม่มีคอร์ส</p>
                            </AccordionItem>
                        )}
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
