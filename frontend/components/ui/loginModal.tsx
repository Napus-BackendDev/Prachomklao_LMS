"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type LogInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string
  setEmail: (value: string) => void;
  password: string
  setPassword: (value: string) => void;
  handleLogin: () => void;
  handleOpenSignup: () => void;
  handleOpenReset: () => void;
};

export default function LogInModal({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleOpenSignup,
  handleOpenReset,
}: LogInModalProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" placement="center" size="md">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-2xl font-bold">
              เข้าสู่ระบบ
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="กรอกอีเมล"
                value={email}
                onValueChange={setEmail}
                classNames={{
                  input: "text-lg",
                }}
              />
              <Input
                endContent={
                  <Button
                    aria-label="password visibility"
                    isIconOnly
                    className="bg-transparent"
                    onPress={toggleVisibility}
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
              <p className="text-primary font-medium cursor-pointer text-end" onClick={handleOpenReset}>
                ลืมรหัสผ่าน?
              </p>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
                onPress={handleLogin}
              >
                เข้าสู่ระบบ
              </Button>
              <div className="flex justify-center gap-2 w-full text-lg">
                <p>ยังไม่มีบัญชีใช่หรือไม่?</p>
                <p className="text-primary font-medium cursor-pointer" onClick={handleOpenSignup}>
                  สมัครใช้งาน
                </p>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
