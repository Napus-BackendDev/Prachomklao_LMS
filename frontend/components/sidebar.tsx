"use client";
import { Button } from "@heroui/button";
import {
  LayoutDashboard,
  BookMarked,
  UsersRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split("/").pop();

  return (
    <aside className="w-56 bg-[#e3e7fa] p-6 flex flex-col gap-5 max-h-full">
      <div className="flex flex-col space-y-3 font-semibold">
        <Button
          variant="flat"
          color={path === "dashboard" ? "primary" : "default"}
          className="flex justify-start px-4 py-2"
          onPress={() => router.push("/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>
        <Button
          variant="flat"
          color={path === "courses" ? "primary" : "default"}
          className="flex justify-start px-4 py-2"
          onPress={() => router.push("/dashboard/courses")}
        >
          <BookMarked className="h-5 w-5" />
          Courses
        </Button>
        <Button
          variant="flat"
          color={path === "users" ? "primary" : "default"}
          className="flex justify-start px-4 py-2"
          onPress={() => router.push("/dashboard/users")}
        >
          <UsersRound className="h-5 w-5" />
          Users
        </Button>
      </div>
    </aside>
  );
};
