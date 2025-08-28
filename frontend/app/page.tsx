"use client";

import { Image } from "@heroui/image";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import {
  Clock4,
  Smile,
  Smartphone,
  GraduationCap,
  Globe,
  Facebook,
} from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { CourseCard } from "@/public/components/courseCard";
import Link from "next/link";

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

const coursesData = [
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ ( Ventilator )",
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
    title:
      "การพยาบาลผู้ป่วยที่ได้รับการรักษาภาวะตัวเหลืองด้วยเครื่องส่องไฟ Phototherapy",
    code: "CLNC-310",
    url: "https://img.youtube.com/vi/JHm4GsMhygM/0.jpg",
    link: "/courses/2",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องให้ความร้อนแบบแผ่รังสี ( Radiant warmer )",
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

const ContextDate = [
  {
    icon: Globe,
    name: "Website",
    url: "https://pckpb.pbri.ac.th",
    description:
      "เยี่ยมชมเว็บไซต์ของเราเพื่อดูรายละเอียดเพิ่มเติมเกี่ยวกับหลักสูตร เนื้อหา และกำหนดการฝึกปฏิบัติ",
  },
  {
    icon: Facebook,
    name: "Facebook",
    url: "วิทยาลัยพยาบาลพระจอมเกล้า",
    description: "ติดตามข่าวสารและข้อมูลล่าสุดได้ทาง Facebook Page ของเรา",
  },
];

export default function Home() {
  return (
    <>
      <section
        id="introduction"
        className="flex sm:flex-row flex-col-reverse items-center justify-between py-8 sm:px-14 px-4 gap-4 bg-[#EBEFFF] w-full"
      >
        <div className="inline-block max-w-xl py-2 space-y-3">
          <h1 className="text-4xl font-extrabold text-default-900">
            Welcome to {siteConfig.name}
          </h1>
          <p className="mt-2 text-xl text-default-600">
            {siteConfig.description}
          </p>
          <Link href="/courses">
          <Button
            className="px-5 my-2 text-medium font-medium"
            color="primary"
            variant="shadow"
          >
            เริ่ม หลักสูตรออนไลน์
          </Button>
          </Link>
        </div>
        <Image
          src="/homepage.png"
          shadow="md"
          alt="Hero Image"
          width={430}
          height={300}
        />
      </section>
      <section
        id="About"
        className="flex  flex-col items-center justify-center py-12  px-4"
      >
        <h1 className="sm:text-3xl text-lg font-semibold inline-flex flex-nowrap items-baseline gap-2 mb-2">
          <span>วิทยาลัยพยาบาลพระจอมเกล้า จังหวัดเพชรบุรี</span>
          <span className="text-[#4E71FF]">เปิดแหล่งเรียนรู้</span>
        </h1>
        <p className="sm:text-xl text-medium text-default-600 ">
          เพื่อพัฒนาความรู้และทักษะด้านการพยาบาลอย่างรอบด้าน
          ให้ผู้เรียนได้ฝึกปฏิบัติจริงและเตรียมพร้อมสู่การเป็นพยาบาลมืออาชีพ
        </p>

        <div id="features" className="flex m-6 flex-wrap justify-center  gap-6">
          {featuresData.map((item) => (
            <div
              className="flex flex-col items-center justify-center pt-4"
              key={item.topic}
            >
              <item.icon className="w-24 h-24 text-primary mb-2" />
              <h2 className="text-lg font-semibold">{item.topic}</h2>
              <p className="text-sm text-default-600 whitespace-normal">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="courses"
        className="flex flex-col items-center justify-center py-12 space-y-12 bg-[#EBEFFF] w-full "
      >
        <h1 className="text-3xl font-semibold ">หลักสูตรออนไลน์ของเรา</h1>
        <div className="flex sm:flex-row flex-col items-stretch justify-center w-full px-15 gap-7">
          {coursesData.map((course) => (
            <CourseCard
              key={course.code}
              title={course.title}
              code={course.code}
              url={course.url}
            />
          ))}
        </div>
      </section>
      <section
        id="Feedback"
        className="flex flex-col items-center justify-center py-12 w-full space-y-12"
      >
        <h1 className="text-3xl font-semibold">รวมความประทับใจ</h1>
        <div className="flex sm:flex-row flex-col items-stretch justify-center gap-6">
          {FeedbackData.map((feedback) => (
            <Card className="mx-0 flex flex-col w-90" key={feedback.name}>
              <CardHeader className="flex flex-col items-start gap-2 pb-0 ">
                <div>
                  <h2 className="text-2xl font-semibold">{feedback.name}</h2>
                  <h6 className="text-md">{feedback.subname}</h6>
                </div>
              </CardHeader>
              <CardBody className="flex-1 flex items-center">
                <h6 className="text-sm">{feedback.description}</h6>
              </CardBody>
            </Card>
          ))}
        </div>
        <h1 className="text-3xl font-semibold">ช่องทางติดต่อ</h1>
        <div className="flex sm:flex-row flex-col items-stretch justify-center gap-10">
          {ContextDate.map((context) => (
            <Card key={context.name}>
              <CardHeader className="flex items-center gap-4 pb-0">
                <context.icon className="w-9 h-9 text-primary" />
                <div className="flex flex-col">
                  <span className="text-medium font-semibold">
                    {context.name}
                  </span>
                  <span className="text-sm">{context.url}</span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-sm w-2xs"> {context.description} </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
      <footer className="w-full h-5 bg-[#7F9FE0] border-b-2 border-[#0930CF]" />
    </>
  );
}
