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
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useStudent from "@/hooks/useStudent";

type LogInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
};

export default function LogInModal({ isOpen, onClose, onOpenSignup }: LogInModalProps) {
  const { login } = useAuth();
  const { fetchStudent } = useStudent();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async () => {
    if (!email || !password) return console.error("กรอกอีเมล/รหัสผ่านก่อน");

    const res = await login(email, password);
    if (res) {
      await fetchStudent();
      onClose();
    };
  };

  const handleOpenSignup = () => {
    onClose();
    onOpenSignup();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="md">
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
              <div className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <p>จดจำฉัน</p>
                </div>
                <Link href="/forgot-password" className="text-primary font-medium">
                  ลืมรหัสผ่าน?
                </Link>
              </div>
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
