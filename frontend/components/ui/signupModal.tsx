"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Button,
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

type SignUpModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
};

export default function SignUpModal({ isOpen, onClose, onOpenLogin }: SignUpModalProps) {
    const { signup } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async () => {
        if (!username || !email || !password) return console.error("กรอกข้อมูลให้ครบ");

        await signup(username, email, password);
    };

    const handleOpenLogin = () => {
        onClose();
        onOpenLogin();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" placement="center" size="md">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="text-2xl font-bold">
                            สมัครใช้งาน
                        </ModalHeader>
                        <ModalBody className="flex flex-col gap-4">
                            <Input
                                type="text"
                                placeholder="กรอกชื่อ"
                                value={username}
                                onValueChange={setUsername}
                                classNames={{ input: "text-lg" }}
                            />
                            <Input
                                type="text"
                                placeholder="กรอกอีเมล"
                                value={email}
                                onValueChange={setEmail}
                                classNames={{ input: "text-lg" }}
                            />
                            <Input
                                endContent={
                                    <Button
                                        aria-label="password visibility"
                                        isIconOnly
                                        className="bg-transparent"
                                        onPress={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </Button>
                                }
                                type={isVisible ? "text" : "password"}
                                placeholder="กรอกรหัสผ่าน"
                                value={password}
                                onValueChange={setPassword}
                                classNames={{ input: "text-lg" }}
                            />
                        </ModalBody>
                        <ModalFooter className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
                                onPress={handleSignup}
                            >
                                สมัครใช้งาน
                            </Button>
                            <div className="flex justify-center gap-2 w-full text-lg">
                                <p>มีบัญชีอยู่แล้วหรือไม่?</p>
                                <p className="text-primary font-medium cursor-pointer" onClick={handleOpenLogin}>
                                    เข้าสู่ระบบ
                                </p>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
