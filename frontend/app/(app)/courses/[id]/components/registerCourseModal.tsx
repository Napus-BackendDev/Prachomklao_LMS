import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { User } from "lucide-react";

interface RegisterCourseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setShowPretest: (open: boolean) => void;
}

export function RegisterCourseModal({ isOpen, onOpenChange, setShowPretest }: RegisterCourseModalProps) {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              สมัครเรียนคอร์สนี้
            </ModalHeader>
            <ModalBody>
              <Input
                endContent={
                  <User className="text-2xl text-default-400 pointer-events-none shrink-0" />
                }
                label="Username"
                placeholder="Enter your Username"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                ยกเลิก
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  setShowPretest(true);
                  onClose();
                }}
              >
                ยืนยันการสมัคร
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
