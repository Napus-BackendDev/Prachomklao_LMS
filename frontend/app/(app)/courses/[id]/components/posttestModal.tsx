import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface posttestModalProps {
  showPosttest: boolean;
  setShowPosttest: (open: boolean) => void;
  setShowAssessment: (open: boolean) => void;
}

export function posttestModal({
  showPosttest,
  setShowPosttest,
  setShowAssessment,
}: posttestModalProps) {
  return (
    <Modal
      isOpen={showPosttest}
      placement="top-center"
      onOpenChange={setShowPosttest}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>แบบทดสอบ Posttest</ModalHeader>
            <ModalBody>
              <div>
                <p>1. ตัวอย่างคำถาม Posttest ข้อที่ 1</p>
                <Input label="คำตอบของคุณ" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  onClose(), setShowAssessment(true);
                }}
              >
                ส่งคำตอบ
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
