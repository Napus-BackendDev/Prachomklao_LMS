"use client";

import { Image } from "@heroui/image";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import {
  Clock4,
  Smile,
  Smartphone,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import CourseCard from "@/components/ui/courseCard";
import Link from "next/link";
import { useState } from "react";

const featuresData = [
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

// Mockup
const coursesData = [
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ ( Ventilator )",
    code: "MEDNUR-101",
    url: "https://img.youtube.com/vi/hFgiweAHkXQ/0.jpg",
    link: "/courses/",
  },
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้ตู้อบ (Incubator)",
    code: "HSC-201",
    url: "https://img.youtube.com/vi/PEYZoVI9M_c/0.jpg",
    link: "/courses/1",
  },
  {
    title: "การพยาบาลผู้ป่วยที่ได้รับการรักษาภาวะตัวเหลืองด้วยเครื่องส่องไฟ Phototherapy",
    code: "CLNC-310",
    url: "https://img.youtube.com/vi/JHm4GsMhygM/0.jpg",
    link: "/courses/2",
  },
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องให้ความร้อนแบบแผ่รังสี ( Radiant warmer )",
    code: "MEDNUR-405",
    url: "https://img.youtube.com/vi/ck4RGeoHFko/0.jpg",
    link: "/courses/3",
  },
];

const FeedbackData = [
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
  const [course, setCourse] = useState(0);
  const handlePrev = () => {
    if (course > 0) setCourse(course - 1);
  };
  const handleNext = () => {
    if (course < coursesData.length - 3) setCourse(course + 1);
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
          {featuresData.map((item) => (
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

      {/* COURSES */}
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-12 space-y-12 bg-[#EBEFFF]"
      >
        <h1 className="text-4xl font-semibold">หลักสูตรออนไลน์ของเรา</h1>
        <div className="flex items-center">
          {coursesData.length > 3 && (
            <Button
              isIconOnly
              color={course === 0 ? "default" : "primary"}
              variant="flat"
              onPress={handlePrev}
              disabled={course === 0}
            >
              <ChevronLeft />
            </Button>
          )}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${course * 33.333}%)` }}
            >
              {coursesData.map((course) => (
                <div key={course.code} className="shrink-0 w-1/3 px-2">
                  <CourseCard
                    title={course.title}
                    code={course.code}
                    url={course.url}
                  />
                </div>
              ))}
            </div>
          </div>
          {coursesData.length > 3 && (
            <Button
              isIconOnly
              color={course === coursesData.length - 3 ? "default" : "primary"}
              variant="flat"
              onPress={handleNext}
              disabled={course === (coursesData.length - 3)}
            >
              <ChevronRight />
            </Button>
          )}
        </div>
      </section>

      {/* FEEDBACK */}
      <section
        id="Feedback"
        className="flex flex-col items-center justify-center max-w-screen-xl mx-auto py-12 gap-12"
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold">รวมความประทับใจ</h1>
          <div className="flex sm:flex-row flex-col items-stretch justify-center gap-6">
            {FeedbackData.map((feedback) => (
              <Card className="gap-2 w-full" key={feedback.name}>
                <CardHeader>
                  <Quote color="gray"/>
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
