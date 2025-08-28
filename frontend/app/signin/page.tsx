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
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className=" flex  w-full h-screen justify-center items-center">
      <Card className="w-full max-w-md rounded-xl border border-blue-500 shadow-lg bg-white py-4 px-4">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center">
            Access Your Learning Space
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Sign in to continue your courses and track your progress
          </p>
        </CardHeader>
        <CardBody className="flex flex-col space-y-2 gap-4 mt-4">
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
          />
          <div className="relative mt-1">
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <h1 className="text-sm">Remember me</h1>
            </div>
            <Link
              href="/forgot-password"
              className="text-xs text-blue-700 hover:underline font-medium"
            >
              Forgot Password ?
            </Link>
          </div>
          <Link href={"/signin/dashboard"}>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 text-lg"
            >
              Sign in
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
