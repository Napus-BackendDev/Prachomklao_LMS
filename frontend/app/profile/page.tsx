"use client";
import useAuth from "@/hooks/useAuth";
import { Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser, login, signup, logout, resetPassword } = useAuth();

  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center px-20 py-10 gap-8">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <div className="flex flex-col gap-4 border p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-lg font-semibold"> {user?.username}</p>
        <p className="text-lg font-semibold"> {user?.email}</p>
        <div className="flex gap-4">
          <div className="flex">
            <Calendar className="inline-block mr-2" />
            <p>Joined: {user?.createdAt} </p>
          </div>
          <div className="flex">
            <Calendar className="inline-block mr-2" />
            <p>Course: {user?.courses?.length} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
