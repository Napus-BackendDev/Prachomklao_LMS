"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Input,
} from "@heroui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const { signup } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async () => {
        if (!username || !email || !password) return console.error("enter"); // Rewrite

        const res = await signup(username, email, password);
        if (res) router.push("/");
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center w-md h-full gap-4">
                <p className="text-5xl font-bold">
                    สมัครใช้งาน
                </p>
                <Input
                    type="text"
                    placeholder="กรอกชื่อ"
                    value={username}
                    onValueChange={setUsername}
                    classNames={{
                        input: "text-lg"
                    }}
                />
                <Input
                    type="text"
                    placeholder="กรอกอีเมล"
                    value={email}
                    onValueChange={setEmail}
                    classNames={{
                        input: "text-lg"
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
                            {isVisible ? (
                                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    }
                    type={isVisible ? "text" : "password"}
                    placeholder="กรอกรหัสผ่าน "
                    value={password}
                    onValueChange={setPassword}
                    classNames={{
                        input: "text-lg"
                    }}
                />
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 text-xl"
                    onPress={handleSignup}
                >
                    สมัครใช้งาน
                </Button>
                <div className="flex justify-center gap-4 w-full text-xl">
                    <p>มีบัญชีอยู่แล้วหรือไม่?</p>
                    <Link
                        href="/login"
                        className="text-primary font-medium"
                    >
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </div>
    );
}
