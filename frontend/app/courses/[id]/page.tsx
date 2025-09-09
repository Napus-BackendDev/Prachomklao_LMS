"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Image,
} from "@heroui/react";
import { Users, FileText, Target } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useStudent from "@/hooks/useStudent";
import useCourses from "@/hooks/useCourses";
import { Course } from "@/types/couse";
import LogInModal from "@/components/ui/loginModal";
import SignUpModal from "@/components/ui/signupModal";
import useEnroll from "@/hooks/useEnroll";

export default function CoursePage() {
  const { student } = useStudent();
  const { fetchCourseById } = useCourses();
  const { createEnroll } = useEnroll();
  const router = useRouter();
  const pathName = usePathname();
  const courseId = pathName.split("/").pop()

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [course, setCourse] = useState<Course | null>(null);
  const examList = [
    { title: "แบบทดสอบก่อนเรียน", count: course?.pretest_Totle },
    { title: "แบบทดสอบหลังเรียน", count: course?.posttest_Totle },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (courseId) {
        const course = await fetchCourseById(courseId);
        setCourse(course);
      }
    };

    fetchData();
  }, [pathName]);

  const handleEnroll = async () => {
    if (!student) return setIsLoginOpen(true);

    if (courseId) {
      await createEnroll(courseId);
      router.push(`/enroll/${courseId}`);
    }
  }

  return (
    <div className="flex max-w-screen-2xl gap-8 mx-auto py-4">
      {/* Left Content */}
      <div className="flex-grow">
        <Image
          removeWrapper
          alt="course"
          src={course?.urlPicture}
          className="w-full h-full aspect-video object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex-shrink flex flex-col gap-4 w-1/3">
        <Card className="flex flex-col px-6 py-4 gap-4 h-fit">
          {/* Test Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                <Target /> รายละเอียดแบบทดสอบในคอร์สนี้
              </div>
            </div>
            {examList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border border-blue-400 rounded px-3 py-2"
              >
                <div className="flex items-center gap-2 text-base">
                  <FileText className="text-blue-500" size={20} />
                  {item.title}
                </div>
                <span className="text-blue-600 text-sm">จำนวน {item.count} ข้อ</span>
              </div>
            ))}
          </div>

          {/* Enrolled Users */}
          <div className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Users /> จำนวนคนที่สมัครคอร์สนี้ไปแล้ว
            </div>
            <p className="text-blue-600 font-semibold text-xl">
              จำนวน {Object.keys(course?.students ?? {}).length} คน
            </p>
          </div>
        </Card>

        {/* Enroll Button */}
        <Card className="flex self-start w-full gap-2 p-4">
          <div>
            <p className="text-2xl font-bold self-start">หัวข้อ :</p>
            <p className="text-2xl self-start">{course?.title}</p>
          </div>
          <Button
            color="primary"
            variant="shadow"
            radius="sm"
            className="text-xl font-semibold"
            onPress={handleEnroll}
          >
            สมัคร Course
          </Button>
        </Card>
      </div>

      <LogInModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />

      <SignUpModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </div>
  );
}
