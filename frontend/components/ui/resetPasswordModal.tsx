"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Form,
} from "@heroui/react";
import { FormEvent } from "react";

type ResetPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  onResetPassword: (e: FormEvent) => void;
};

export default function ResetPassword({
  isOpen,
  onClose,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  onResetPassword,
}: ResetPasswordProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="blur"
      placement="center"
      size="md"
    >
      <ModalContent>
        <Form onSubmit={onResetPassword}>
          <ModalHeader className="text-2xl font-bold">
            รีเซ็ตรหัสผ่าน
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4 w-full">
            {/* Email Input */}
            <Input
              isRequired
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
              isRequired
              type="text"
              placeholder="กรอกรหัสผ่านใหม่"
              value={newPassword}
              onValueChange={setNewPassword}
              classNames={{
                input: "text-lg",
              }}
            />
          </ModalBody>
          <ModalFooter className="w-full">
            <Button variant="light" onPress={onClose}>
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
            >
              ยืนยันการรีเซ็ต
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}
