"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";

type ResetPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  handleResetPassword: (email: string, newPassword: string) => void;
};

export default function ResetPassword({
  isOpen,
  onClose,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  handleResetPassword,
}: ResetPasswordProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" placement="center" size="md">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-2xl font-bold">
              รีเซ็ตรหัสผ่าน
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              {/* Email Input */}
              <Input
                type="email"
                placeholder="กรอกอีเมล"
                value={email}
                onValueChange={setEmail}
                classNames={{
                  input: "text-lg",
                }}
              />

              {/* Password Input */}
              <Input
                type="text"
                placeholder="กรอกรหัสผ่านใหม่"
                value={newPassword}
                onValueChange={setNewPassword}
                classNames={{
                  input: "text-lg",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
                onPress={() => handleResetPassword(email, newPassword)}
              >
                ยืนยันการรีเซ็ต
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
