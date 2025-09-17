"use client";

import {
  Clock4,
  Smile,
  Smartphone,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { Button, Image, Link, Skeleton } from "@heroui/react";
import CourseCard from "@/components/ui/courseCard";
import { useEffect, useState } from "react";
import useCourses from "@/hooks/useCourses";
import { Courses } from "@/types/couses";

const features = [
  {
    icon: Clock4,
    topic: "ประหยัดเวลา",
    detail: "เข้าถึงบทเรียนได้ทันที ไม่ต้องเสียเวลาเดินทาง",
  },
  {
    icon: Smartphone,
    topic: "เรียนได้ทุกที่",
    detail: "เรียนผ่านออนไลน์ได้ ทุกอุปกรณ์ ทุกสถานที่",
  },
  {
    icon: Smile,
    topic: "สนุก",
    detail: "เนื้อหาโต้ตอบได้ มีสื่อภาพและกิจกรรมประกอบ",
  },
  {
    icon: GraduationCap,
    topic: "ได้ความรู้",
    detail: "เข้าใจง่าย ใช้ได้จริงในวิชาชีพ",
  },
];

const organizers = [
  "/organizer/organizer1.png",
  "/organizer/organizer2.png",
  "/organizer/organizer3.png",
  "/organizer/organizer4.png",
  "/organizer/organizer5.png",
  "/organizer/organizer6.png",
  "/organizer/organizer7.png",
  "/organizer/organizer8.png",
  "/organizer/organizer9.png",
  "/organizer/organizer10.png",
];

export default function Home() {
  const { courses, loading } = useCourses();

  const [organizer, setOrganizers] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrganizers((prev) => (prev + 1) % (organizers.length - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* INTRODUCTION */}
      <section
        id="introduction"
        className="py-8 w-screen bg-gradient-to-r from-[#CFE6F7] via-[#F6F8E7] to-[#FFEFBE]"
      >
        <div className="max-w-screen-xl mx-auto flex sm:flex-row flex-col-reverse items-center justify-between gap-4 px-4">
          <div className="py-2 space-y-3">
            <p className="text-5xl font-extrabold text-default-900">
              ยินดีต้อนรับสู่แหล่งเรียนรู้ <br />
              <span className="text-[#168AFF]">
                วิทยาลัยพยาบาลพระจอมเกล้าจังหวัดเพชรบุรี
              </span>
            </p>
            <p className="mt-2 text-2xl text-default-600 max-w-xl">
              ก้าวเข้าสู่โลกแห่งความรู้ด้านการพยาบาลเด็กและวัยรุ่น ที่ผสานเทคโนโลยีการเรียนการสอนสมัยใหม่เข้ากับประสบการณ์จริงเพื่อเตรียมความพร้อมในการฝึกปฎิบัติ
            </p>
            <Link href="/courses">
              <Button
                className="py-6 text-2xl text-white font-medium bg-gradient-to-r from-[#168AFF] to-[#359AFF] hover:scale-105"
                variant="shadow"
                size="lg"
                radius="lg"
                endContent={<ChevronRight />}
              >
                เริ่มเรียน
              </Button>
            </Link>
          </div>
          <Image
            src="/welcome.png"
            alt="Hero Image"
            radius="lg"
            className="shadow-md border-2 border-blue-50 hover:scale-101 transition-transform"
            height={320}
          />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="About"
        className="flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-t from-[#FFFFFF] to-[#F0F8FF]"
      >
        <h1 className="sm:text-4xl font-semibold inline-flex flex-nowrap items-baseline gap-2 mb-2">
          <span>วิทยาลัยพยาบาลพระจอมเกล้า จังหวัดเพชรบุรี</span>
          <span className="text-[#0C85FF]">เปิดแหล่งเรียนรู้</span>
        </h1>
        <p className="sm:text-2xl text-lg text-default-600">
          เพื่อพัฒนาความรู้และทักษะด้านการพยาบาลอย่างรอบด้าน ให้ผู้เรียนได้ฝึกปฏิบัติจริงและเตรียมพร้อมสู่การเป็นพยาบาลมืออาชีพ
        </p>
        <div id="features" className="flex justify-center py-8 gap-24">
          {features.map((item) => (
            <div
              className="flex flex-col items-center text-center space-y-4"
              key={item.topic}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FFCF41] to-[#FFDC72] flex items-center justify-center shadow-floating">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0C85FF]">{item.topic}</h2>
              <p className="text-lg text-default-800">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-12 space-y-6 bg-gradient-to-b from-[#FFFFFF] to-[#F0F8FF]"
      >
        <p className="text-4xl font-semibold">หลักสูตรของเรา</p>
        <div className="flex items-start gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-100 h-100 rounded-lg mb-2" />
            ))
          ) : (
            courses?.slice(0, 3).map((course: Courses) => (
              <div
                key={course.id}
                className={`flex shrink-0 basis-1/${courses.length % 3} p-4`}
              >
                <CourseCard
                  title={course.title}
                  id={course.id ?? ""}
                  picture={course.urlPicture ?? ""}
                  courseCode={course.courseCode ?? ""}
                  totalStudent={course.totalStudent ?? 0}
                />
              </div>
            ))
          )}
        </div>
        {/* All Courses Button */}
        <Link
          color="foreground"
          href="/courses"
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors text-default-700 group transition duration-200 hover:scale-105"
        >
          <p className="text-2xl font-semibold">หลักสูตรทั้งหมด</p>
          <ChevronRight />
        </Link>
      </section>

      {/* ORGANIZER */}
      <section
        id="organizer"
        className="flex flex-col items-center justify-center py-12 space-y-6 bg-gradient-to-b from-[#F0F8FF] to-[#EEF7FF]"
      >
        <p className="text-4xl font-semibold">ผู้จัดทำ</p>
        <div
          className="flex justify-between transition-transform duration-1000"
          style={{
            transform: `translateX(-${organizer * 33}%)`,
          }}
        >
          {[...organizers].map((src, i) => (
            <div key={i} className="shrink-0 basis-1/3">
              <Image
                alt={`organizer-${i}`}
                src={src}
                radius="sm"
                height={360}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
