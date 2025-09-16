"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@heroui/react";

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function ConfirmModal({ isOpen, onClose, onDelete }: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            backdrop="blur"
            size="xs"
        >
            <ModalContent>
                <ModalHeader className="text-xl font-bold text-red-600">
                    ยืนยันการลบ
                </ModalHeader>
                <ModalBody>
                    <p className="text-lg">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?</p>
                    <p className="text-lg">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        ยกเลิก
                    </Button>
                    <Button color="danger" onPress={onDelete}>
                        ลบ
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
