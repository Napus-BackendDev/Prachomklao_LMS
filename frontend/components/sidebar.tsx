"use client";
import { Button } from "@heroui/button";
import {
  LayoutDashboard,
  BookMarked,
  UsersRound,
  MessageSquareWarning,
  Bug,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="w-56 bg-[#e3e7fa] p-6 flex flex-col gap-5 max-h-full">
      <div className="flex flex-col space-y-3">
        <Button
          variant="flat"
          color="primary"
          className="flex justify-start px-4 py-2 font-semibold"
          onPress={() => router.push("/signin/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>
        <Button
          variant="flat"
          className="flex justify-start px-4 py-2 bg-white"
          onPress={() => router.push("/signin/dashboard/courses")}
        >
          <BookMarked className="h-5 w-5" />
          Course
        </Button>
        <Button
          variant="flat"
          className="flex justify-start px-4 py-2 bg-white"
          onPress={() => router.push("/signin/dashboard/users")}
        >
          <UsersRound className="h-5 w-5" />
          Users
        </Button>
        <Button
          variant="flat"
          className="flex justify-start px-4 py-2 bg-white"
        >
          <MessageSquareWarning className="h-5 w-5" />
          Feedback
        </Button>
        <Button
          variant="flat"
          className="flex justify-start px-4 py-2 bg-white"
        >
          <Bug className="h-5 w-5" />
          Reports
        </Button>
      </div>
      <Button
        variant="flat"
        color="danger"
        className="flex justify-start px-4 py-2"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </aside>
  );
};
