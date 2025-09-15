import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

interface CourseModalProps {
  isOpen: boolean;
}

export function courseModal({
  isOpen,
}: CourseModalProps) {

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent className="max-w-full px-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Course
              </ModalHeader>
              <ModalBody className="grid grid-cols-2">
                <div className="space-y-4 px-2">
                  <Input
                    label="Youtube Link"
                    placeholder="Enter youtube link"
                  />
                  <Input label="Course Code" placeholder="Enter course code" />
                  <Input
                    label="Course Topic"
                    placeholder="Enter course topic"
                  />
                  <Input
                    label="Course Details"
                    placeholder="Enter course details"
                  />
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color="primary" onPress={onClose}>
                  เพิ่ม
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
