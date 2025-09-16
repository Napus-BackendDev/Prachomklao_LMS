"use client";
import useAuth from "@/hooks/useAuth";
import { useState, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/ui/courseCard"; // เพิ่ม import ถ้ามี
import { Button } from "@heroui/button";
import useEnroll from "@/hooks/useEnroll";
import { formatDate } from "@/public/util/fromatData";

export default function ProfilePage() {
  const { user } = useAuth();
  const { enrolled, loading: enrolledLoading } = useEnroll();

  const courses = user?.courses ?? [];
  const displayAmount = 3; // จำนวนคอร์สที่แสดงพร้อมกัน
  const [displayCourse, setDisplayCourse] = useState(0);

  const handlePrev = () => {
    setDisplayCourse((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setDisplayCourse((prev) =>
      Math.min(prev + 1, courses.length - displayAmount)
    );
  };

  const userDate = formatDate(user?.createdAt ?? "");

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-20 py-10 gap-8">
      <h1 className="text-4xl font-bold text-primary mb-2">Profile Page</h1>
      {/* Profile Card */}
      <div className="flex gap-6 border border-blue-100 bg-white/80 p-8 rounded-2xl shadow-lg w-full max-w-3xl items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-200 to-yellow-100 flex items-center justify-center mb-2">
          <span className="text-4xl font-bold text-blue-500">
            {user?.username?.[0]?.toUpperCase() ?? "U"}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-gray-800">
            {user?.username}
          </p>
          <p className="text-md text-gray-500">{user?.email}</p>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Joined:</span>
              <span>{userDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Courses:</span>
              <span>{courses.length}</span>
            </div>
          </div>
        </div>
        <div className="ml-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-blue-100 to-blue-50 shadow text-blue-700 min-w-[110px]">
            <span className="text-3xl font-bold">
              {
                enrolled.filter((course) => course.status === "Completed")
                  .length
              }
            </span>
            <span className="mt-1 text-base font-semibold">Completed</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow text-yellow-700 min-w-[110px]">
            <span className="text-3xl font-bold">
              {
                enrolled.filter((course) => course.status === "In progress")
                  .length
              }
            </span>
            <span className="mt-1 text-base font-semibold">In Progress</span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <h2 className="text-3xl font-bold text-primary mt-8">
        Your Enrolled Courses
      </h2>
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-8 space-y-6 w-full bg-gradient-to-b from-[#FFFFFF] to-[#F0F8FF] rounded-2xl shadow-inner"
      >
        <p className="text-2xl font-semibold mb-2 text-gray-700">
          หลักสูตรของเรา
        </p>
        <div className="flex items-center gap-4 w-full justify-center">
          {courses.length > 0 && (
            <Button
              isIconOnly
              color={displayCourse === 0 ? "default" : "primary"}
              variant="flat"
              onPress={handlePrev}
              disabled={displayCourse === 0}
              className={displayCourse === 0 ? "" : "hover:scale-105"}
            >
              <ChevronLeft />
            </Button>
          )}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${displayCourse * (100 / displayAmount)}%)`,
              }}
            >
              {enrolled.map((course) => (
                <div
                  key={course.id}
                  className={`h-full shrink-0 basis-1/${displayAmount} p-4`}
                >
                  <CourseCard
                    title={course.title}
                    id={course.id ?? ""}
                    picture={course.urlPicture ?? ""}
                  />
                </div>
              ))}
            </div>
          </div>
          {courses.length > displayAmount && (
            <Button
              isIconOnly
              color={
                displayCourse === courses.length - displayAmount
                  ? "default"
                  : "primary"
              }
              variant="flat"
              onPress={handleNext}
              disabled={displayCourse === courses.length - displayAmount}
              className={
                displayCourse === courses.length - displayAmount
                  ? ""
                  : "hover:scale-105"
              }
            >
              <ChevronRight />
            </Button>
          )}
        </div>
        {courses.length === 0 && (
          <div className="text-gray-400 text-lg mt-8">
            You have not enrolled in any courses yet.
          </div>
        )}
      </section>
    </div>
  );
}
