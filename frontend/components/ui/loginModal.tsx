"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Card,
} from "@heroui/react";
import { CircleAlert, EyeIcon, EyeOffIcon } from "lucide-react";

type LogInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onLogin: () => Promise<string>;
  onOpenSignup: () => void;
  onOpenReset: () => void;
};

export default function LogInModal({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onOpenSignup,
  onOpenReset,
}: LogInModalProps) {
  const [isError, setIsError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError(false);
    const res = await onLogin();
    if (res) {
      window.location.reload();
    } else {
      setIsError(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="blur"
      placement="center"
      size="md"
    >
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <ModalHeader className="text-2xl font-bold">เข้าสู่ระบบ</ModalHeader>
          <ModalBody className="flex flex-col gap-4 w-full">
            {isError ? (
              <p className="flex items-center gap-2 text-danger font-medium text-center">
                <CircleAlert size={16} />
                อีเมลหรือรหัสผ่านไม่ถูกต้อง
              </p>
            ) : null}
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
            <Input
              isRequired
              endContent={
                <Button
                  aria-label="password visibility"
                  isIconOnly
                  className="bg-transparent"
                  onPress={toggleVisibility}
                  type="button"
                >
                  {isPasswordVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
              type={isPasswordVisible ? "text" : "password"}
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onValueChange={setPassword}
              classNames={{
                input: "text-lg",
              }}
            />
            <p
              className="text-primary font-medium cursor-pointer text-end"
              onClick={onOpenReset}
            >
              ลืมรหัสผ่าน?
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-col gap-4 w-full">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
            >
              เข้าสู่ระบบ
            </Button>
            <div className="flex justify-center gap-2 w-full text-lg">
              <p>ยังไม่มีบัญชีใช่หรือไม่?</p>
              <p
                className="text-primary font-medium cursor-pointer"
                onClick={onOpenSignup}
              >
                สมัครใช้งาน
              </p>
            </div>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}
