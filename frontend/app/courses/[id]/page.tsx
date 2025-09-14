"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Image,
  Skeleton,
} from "@heroui/react";
import { Users, FileText, Target } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useStudent from "@/hooks/useStudent";
import useCourses from "@/hooks/useCourses";
import LogInModal from "@/components/ui/loginModal";
import SignUpModal from "@/components/ui/signupModal";
import useEnroll from "@/hooks/useEnroll";
import { CourseData, EnrolledCourse } from "@/types/couses";
import useAuth from "@/hooks/useAuth";

export default function CoursePage() {
  const { login, signup } = useAuth();
  const { fetchCourseById } = useCourses();
  const { createEnroll, fetchEnrolledById, loading: enrolledLoading } = useEnroll();
  const { student, fetchStudent, loading: studentLoading } = useStudent();
  const router = useRouter();
  const pathName = usePathname();
  const courseId = pathName.split("/").pop()
  const isLoading = enrolledLoading || studentLoading;

  const [course, setCourse] = useState<CourseData>();
  const [enrolled, setEnrolled] = useState<EnrolledCourse>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const contentList = [
    { title: "แบบทดสอบก่อนเรียน", count: course?.pretest_totle ?? 0 },
    { title: "บทเรียน", count: (course?.courses.content?.length ?? 0) + 1 },
    { title: "แบบทดสอบหลังเรียน", count: course?.posttest_totle ?? 0 },
  ];

  const handleOpenLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }

  const handleOpenSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }

  const handleLogin = async () => {
    if (!email || !password) return console.error("กรอกอีเมล/รหัสผ่านก่อน");

    const res = await login(email, password);
    if (res) {
      await fetchStudent();
      setIsLoginOpen(false);
    };
  };

  const handleSignup = async () => {
    if (!username || !email || !password) return console.error("กรอกข้อมูลให้ครบ");

    await signup(username, email, password);
  };

  const handleEnroll = async () => {
    if (!student) return setIsLoginOpen(true);

    if (!courseId) return;

    if (!enrolled) {
      const res = await createEnroll(courseId);
      if (res) router.push(`/enroll/${courseId}`);
    } else {
      router.push(`/enroll/${courseId}`);
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      if (courseId) {
        const course = await fetchCourseById(courseId);
        setCourse(course);
      }
    };

    fetchData();
  }, [pathName]);

  useEffect(() => {
    if (!courseId) return;

    const fetchEnrolled = async () => {
      const enrolled = await fetchEnrolledById(courseId);
      if (enrolled) setEnrolled(enrolled);
    }

    fetchEnrolled();
  }, [courseId])

  return (
    <div className="flex max-w-screen-2xl gap-8 mx-auto py-8">
      {/* Left Content */}
      <div className="flex-grow">
        {isLoading ? (
          <Skeleton className="w-full aspect-video rounded-lg" />
        ) : (
          <Image
            removeWrapper
            alt="course"
            src={course?.courses.urlPicture}
            className="w-full h-full aspect-video object-cover rounded-lg"
          />
        )}
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
            {contentList.map((item, idx) => (
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
            <p className="text-2xl self-start">{course?.courses.title}</p>
          </div>
          <Button
            color="primary"
            variant="shadow"
            radius="sm"
            className="text-xl font-semibold"
            isDisabled={isLoading || (enrolled && enrolled.status === "Completed")}
            onPress={handleEnroll}
          >
            {(enrolled && enrolled.status === "Completed")
              ? "เสร็จสิ้นคอร์ส"
              : enrolled
                ? "เรียนต่อ"
                : "สมัครคอร์ส"
            }
          </Button>
        </Card>
      </div>

      <LogInModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleOpenSignup={handleOpenSignup}
      />

      <SignUpModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignup={handleSignup}
        handleOpenLogin={handleOpenLogin}
      />
    </div>
  );
}
