import {
    Accordion,
    AccordionItem,
    Modal,
    ModalContent
} from "@heroui/react";

type CoursesAccordionProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function CoursesAccordion({ isOpen, onClose, }: CoursesAccordionProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
        >
            <ModalContent>
                <Accordion>
                    <AccordionItem>
                        nkjnj
                    </AccordionItem>
                    <AccordionItem>
                        nkjnj
                    </AccordionItem>
                    <AccordionItem>
                        nkjnj
                    </AccordionItem>
                </Accordion>
            </ModalContent>
        </Modal>
    )
}