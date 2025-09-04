import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface pretestModalProps {
  showPretest: boolean;
  setShowPretest: (open: boolean) => void;
  setShowVideo: (open: boolean) => void;
}

export function pretestModal({ showPretest, setShowPretest, setShowVideo } : pretestModalProps) {
  return (
    <Modal
      isOpen={showPretest}
      placement="top-center"
      onOpenChange={setShowPretest}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>แบบทดสอบ Pretest</ModalHeader>
            <ModalBody>
              <div>
                <p>1. ตัวอย่างคำถาม Pretest ข้อที่ 1</p>
                {/* เพิ่ม input หรือ radio สำหรับคำตอบ */}
                <Input label="คำตอบของคุณ" />
              </div>
              {/* เพิ่มคำถามอื่นๆ ตามต้องการ */}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  setShowVideo(true), onClose();
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
