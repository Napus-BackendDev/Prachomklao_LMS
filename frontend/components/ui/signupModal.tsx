"use client";
import { FormEvent, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
} from "@heroui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type SignUpModalProps = {
    isOpen: boolean;
    onClose: () => void;
    username: string;
    setUsername: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onSignup: (e: FormEvent) => void;
    onOpenLogin: () => void;
};

export default function SignUpModal({
    isOpen,
    onClose,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    onSignup,
    onOpenLogin,
}: SignUpModalProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            backdrop="blur"
            placement="center"
            size="md"
        >
            <ModalContent>
                <Form onSubmit={onSignup}>
                    <ModalHeader className="text-2xl font-bold">
                        สมัครใช้งาน
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-4 w-full">
                        <Input
                            isRequired
                            type="text"
                            placeholder="กรอกชื่อ"
                            value={username}
                            onValueChange={setUsername}
                            classNames={{ input: "text-lg" }}
                        />
                        <Input
                            isRequired
                            type="text"
                            placeholder="กรอกอีเมล"
                            value={email}
                            onValueChange={setEmail}
                            classNames={{ input: "text-lg" }}
                        />
                        <Input
                            isRequired
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
                            classNames={{ input: "text-lg" }}
                        />
                    </ModalBody>
                    <ModalFooter className="flex flex-col gap-4 w-full">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 text-lg"
                        >
                            สมัครใช้งาน
                        </Button>
                        <div className="flex justify-center gap-2 w-full text-lg">
                            <p>มีบัญชีอยู่แล้วหรือไม่?</p>
                            <p className="text-primary font-medium cursor-pointer" onClick={onOpenLogin}>
                                เข้าสู่ระบบ
                            </p>
                        </div>
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    );
}
