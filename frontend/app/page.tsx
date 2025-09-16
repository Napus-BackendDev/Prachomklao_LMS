"use client";

import { siteConfig } from "@/config/site";
import {
  Clock4,
  Smile,
  Smartphone,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from "@heroui/react";
import CourseCard from "@/components/ui/courseCard";
import { useState } from "react";
import useCourses from "@/hooks/useCourses";
import useEnroll from "@/hooks/useEnroll";
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

// Mock up
const feedbacks = [
  {
    name: "กฤตเมธ วงศ์สุวรรณ",
    subname: "การแพทย์และการพยาบาล",
    description: `เรียนการแพทย์และการพยาบาลที่นี่ ไม่ได้แค่ความรู้ แต่ได้ประสบการณ์จริงด้วย ✨ ครบทั้งทฤษฎี-ปฏิบัติ สอนเข้าใจง่าย ผู้สอนมืออาชีพ ❤️ #การแพทย์ #พยาบาล #เรียนออนไลน์ `,
  },
  {
    name: "พิชญ์สินี แสงสุริยา",
    subname: "หลักวิทยาศาสตร์สุขภาพสำหรับแพทย์และพยาบาล",
    description: `หลักวิทยาศาสตร์สุขภาพสำหรับแพทย์และพยาบาล 🔬 ปูพื้นฐานแน่น ครบทั้งทฤษฎีและปฏิบัติ้ได้จริง 🩺 #แพทย์ #พยาบาล #วิทยาศาสตร์สุขภาพ`,
  },
  {
    name: "ธนกฤต อนันต์พงศ์",
    subname: "พื้นฐานวิชาชีพแพทย์และพยาบาล",
    description: `เรียนพื้นฐานวิชาชีพแพทย์และพยาบาล 📚 ได้ทั้งความรู้ ทักษะ และมุมมองวิชาชีพ เตรียมพร้อมสู่การเป็นบุคลากรสุขภาพที่มีคุณภาพ 🩺 #พยาบาล #แพทย์ #เรียนออนไลน์`,
  },
];

export default function Home() {
  const { courses, loading: coursesLoading } = useCourses();
  const { enrolled, loading: enrolledLoading } = useEnroll();

  const [displayCourse, setDisplayCourse] = useState(0);
  const displayAmount = 3;
  const isLoading = coursesLoading || enrolledLoading;

  const handlePrev = () => {
    if (displayCourse > 0) setDisplayCourse(displayCourse - 1);
  };
  const handleNext = () => {
    if (displayCourse < courses?.length - 3) setDisplayCourse(displayCourse + 1);
  };

  return (
    <>
      {/* INTRODUCTION */}
      <section
        id="introduction"
        className="py-8 bg-[#EBEFFF] w-screen"
      >
        <div className="max-w-screen-2xl mx-auto flex sm:flex-row flex-col-reverse items-center justify-between gap-4 px-4">
          <div className="py-2 space-y-3">
            <h1 className="text-5xl font-extrabold text-default-900">
              {siteConfig.name}
            </h1>
            <p className="mt-2 text-2xl text-default-600">
              {siteConfig.description}
            </p>
            <Link href="/courses">
              <Button
                className="py-8 text-2xl font-medium"
                color="primary"
                variant="shadow"
                size="lg"
              >
                เริ่มหลักสูตรออนไลน์
              </Button>
            </Link>
          </div>
          <Image
            src="/homepage.png"
            alt="Hero Image"
            radius="sm"
            width={480}
            height={320}
          />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="About"
        className="flex flex-col items-center justify-center py-12 px-4"
      >
        <h1 className="sm:text-4xl font-semibold inline-flex flex-nowrap items-baseline gap-2 mb-2">
          <span>วิทยาลัยพยาบาลพระจอมเกล้า จังหวัดเพชรบุรี</span>
          <span className="text-[#4E71FF]">เปิดแหล่งเรียนรู้</span>
        </h1>
        <p className="sm:text-2xl text-lg text-default-600">
          เพื่อพัฒนาความรู้และทักษะด้านการพยาบาลอย่างรอบด้าน ให้ผู้เรียนได้ฝึกปฏิบัติจริงและเตรียมพร้อมสู่การเป็นพยาบาลมืออาชีพ
        </p>
        <div id="features" className="flex justify-center py-6 gap-24">
          {features.map((item) => (
            <div
              className="flex flex-col items-center justify-center pt-4"
              key={item.topic}
            >
              <item.icon className="w-28 h-28 text-primary mb-2" />
              <h2 className="text-2xl font-semibold">{item.topic}</h2>
              <p className="text-xl text-default-700 whitespace-normal">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* KEEP LEARNING */}
      {enrolled.length > 0 && (
        <section
          id="keep-learning"
          className="flex flex-col justify-center max-w-screen-lg mx-auto space-y-12 py-12"
        >
          <p className="text-5xl font-semibold text-center">เรียนรู้ต่อ</p>
          <div className="flex flex-col items-center gap-16 w-full mx-auto">
            <div className="flex gap-8">
              {/* Course Card */}
              {enrolled
                .filter((course) => course?.status === "In progress")
                .slice(0, 2)
                .map((course) => (
                  <div key={course.id}>
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      picture={course.urlPicture ?? ""}
                      enrolledAt={course.enrolledAt}
                    />
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-primary h-4 rounded-full transition-all duration-300"
                        style={{
                          width: `${((course.progress?.current ?? 0) / (course.progress?.total ?? 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-md text-default-500 font-medium mt-1">
                      {course.progress?.current ?? 0} / {course.progress?.total ?? 0} บท
                    </p>
                  </div>
                )
                )}
            </div>
            {/* All Enroll Button */}
            <Link
              color="foreground"
              href="/"
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group"
            >
              <p className="text-2xl font-semibold">หลักสูตรที่สมัครเรียนแล้ว</p>
              <ChevronRight />
            </Link>
          </div>
        </section>
      )}

      {/* COURSES */}
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-12 space-y-12 bg-[#EBEFFF]"
      >
        <h1 className="text-4xl font-semibold">หลักสูตรของเรา</h1>
        <div className="flex items-center">
          {courses?.length > displayAmount && (
            <Button
              isIconOnly
              color={displayCourse === 0 ? "default" : "primary"}
              variant="flat"
              onPress={handlePrev}
              disabled={displayCourse === 0}
            >
              <ChevronLeft />
            </Button>
          )}
          <div className="max-w-screen-2xl overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${displayCourse * (100 / displayAmount)}%)` }}
            >
              {courses?.map((course: Courses) => (
                <div
                  key={course.id}
                  className={`shrink-0 flex-grow basis-1/${displayAmount} px-4`}
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
              color={displayCourse === courses.length - displayAmount ? "default" : "primary"}
              variant="flat"
              onPress={handleNext}
              disabled={displayCourse === (courses.length - displayAmount)}
            >
              <ChevronRight />
            </Button>
          )}
        </div>
        {/* All Courses Button */}
        <Link
          color="foreground"
          href="/courses"
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group"
        >
          <p className="text-2xl font-semibold">หลักสูตรทั้งหมด</p>
          <ChevronRight />
        </Link>
      </section>

      {/* FEEDBACK */}
      <section
        id="Feedback"
        className="flex flex-col items-center justify-center max-w-screen-xl mx-auto py-12 gap-12"
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold">รวมความประทับใจ</h1>
          <div className="flex sm:flex-row flex-col items-stretch justify-center gap-6">
            {feedbacks.map((feedback) => (
              <Card className="gap-2 w-full" key={feedback.name}>
                <CardHeader>
                  <Quote color="gray" />
                </CardHeader>
                <CardBody>
                  <p className="text-xl">{feedback.description}</p>
                </CardBody>
                <CardFooter>
                  <div>
                    <p className="text-2xl font-semibold text-primary">{feedback.name}</p>
                    <p className="text-xl text-gray-700">{feedback.subname}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
