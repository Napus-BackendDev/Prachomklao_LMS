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
    <aside className="flex flex-col gap-1 w-56 min-h-screen bg-[#e3e7fa] p-2 border-r border-default-300">
        <Button
          variant="light"
          radius="sm"
          color="primary"
          className={`flex justify-start px-4 py-2 ${path === "admin" ? "bg-primary text-white" : null}`}
          onPress={() => router.push("/admin")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Button>
        <Button
          variant="light"
          radius="sm"
          color="primary"
          className={`flex justify-start px-4 py-2 ${path === "courses" ? "bg-primary text-white" : null}`}
          onPress={() => router.push("/admin/courses")}
        >
          <BookMarked className="h-5 w-5" />
          Courses
        </Button>
        <Button
          variant="light"
          radius="sm"
          color="primary"
          className={`flex justify-start px-4 py-2 ${path === "users" ? "bg-primary text-white" : null}`}
          onPress={() => router.push("/admin/users")}
        >
          <UsersRound className="h-5 w-5" />
          Users
        </Button>
    </aside>
  );
};
