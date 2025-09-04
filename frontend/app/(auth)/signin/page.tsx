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

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center items-center w-md h-full gap-4">
        <p className="text-5xl font-bold">
          เข้าสู่ระบบ
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
        <div className="flex items-center justify-between w-full text-xl">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <p>จดจำฉัน</p>
          </div>
          <Link
            href="/forgot-password"
            className="text-primary font-medium"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-4 text-xl"
        >
          เข้าสู่ระบบ
        </Button>
        <div className="flex justify-center gap-4 w-full text-xl">
          <p>ยังไม่มีบัญชีใช่หรือไม่?</p>
          <Link
            href="/signup"
            className="text-primary font-medium"
          >
            สมัครใช้งาน
          </Link>
        </div>
      </div>
    </div>
  );
}
