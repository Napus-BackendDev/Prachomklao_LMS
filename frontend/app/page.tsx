import { Image } from "@heroui/image";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { Clock4, Smile, Smartphone, GraduationCap, Globe, Facebook, type LucideIcon } from "lucide-react";


type Feature = {
  icon: LucideIcon;
  topic: string;
  detail: string;
};

type Course = {
  title: string;
  description: string;
  link: string;
};

type Contact = {
  icon: LucideIcon;
  name: string;
  url: string;
  description: string;
};

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
    title: "หลักสูตรพยาบาลเด็กและวัยรุ่น",
    description: "เรียนรู้การดูแลพยาบาลเด็กและวัยรุ่นอย่างมืออาชีพ",
    link: "/courses/",
  },
  {
    title: "หลักสูตรการพยาบาลทั่วไป",
    description: "พื้นฐานการพยาบาลที่จำเป็นสำหรับทุกคน",
    link: "/courses/1",
  },
  {
    title: "DADA",
    description: "GE",
    link: "/courses/2",
  },
  {
    title: "EQWE",
    description: "GREG",
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

const ContextDate: Contact[] = [
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
    description:
      "ติดตามข่าวสารและข้อมูลล่าสุดได้ทาง Facebook Page ของเรา",
  },
];

export default function Home() {
  return (
    <>
      <section
        id="introduction"
        className="flex items-center justify-between py-8 px-26 bg-[#EBEFFF] w-full backdrop-blur-2xl"
      >
        <div className="inline-block max-w-xl py-2 space-y-3">
          <h1 className="text-3xl font-bold text-default-900">
            Welcome to {siteConfig.name}
          </h1>
          <p className="mt-2 text-lg text-default-600">
            {siteConfig.description}
          </p>
          <Button
            className="px-5 my-2 text-medium font-medium"
            color="primary"
            variant="shadow"
          >
            เริ่ม หลักสูตรออนไลน์
          </Button>
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
        className="flex flex-col items-center justify-center py-8 px-4"
      >
        <h1 className="text-3xl font-semibold inline-flex flex-nowrap items-baseline gap-2 mb-2">
          <span>วิทยาลัยพยาบาลพระจอมเกล้า จังหวัดเพชรบุรี</span>
          <span className="text-[#4E71FF]">เปิดแหล่งเรียนรู้</span>
        </h1>
        <p className="text-xl text-default-600 ">
          เพื่อพัฒนาความรู้และทักษะด้านการพยาบาลอย่างรอบด้าน
          ให้ผู้เรียนได้ฝึกปฏิบัติจริงและเตรียมพร้อมสู่การเป็นพยาบาลมืออาชีพ
        </p>

        <div id="features" className="flex m-6 flex-wrap justify-center gap-6">
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
        className="flex flex-col items-center justify-center py-8 px-4 bg-[#EBEFFF] w-full"
      >
        <h1 className="text-3xl font-semibold mb-4">หลักสูตรออนไลน์ของเรา</h1>
        <div className="flex items-center justify-center  w-full max-w-4xl">
          {coursesData.map((course) => (
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md m-4 ">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-default-600 mb-2">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="Feedback"
        className="flex flex-col items-center justify-center py-8 px-4 w-full space-y-3"
      >
        <h1 className="text-3xl font-semibold my-2">รวมความประทับใจ</h1>
        <div className="flex items-center justify-center w-full ">
          {FeedbackData.map((feedback) => (
            <div className="flex flex-col bg-white rounded-lg shadow-md m-4 py-4 px-6">
              <div className="mb-3">
                <h2 className="text-2xl"> {feedback.name}</h2>
                <h6 className="text-sm"> {feedback.subname}</h6>
              </div>
              <h6 className="text-sm"> {feedback.description}</h6>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-semibold my-2">ช่องทางติดต่อ</h1>
        <div className="flex items-center justify-center w-full">
          {ContextDate.map((context) => (
            <div className="flex flex-col bg-white rounded-lg shadow-md m-4 py-4 p-6 ">
              <div>
                {context.icon}
                <div>
                  <span>{context.name}</span>
                  <span>{context.url}</span>
                </div>
              </div>
              <p> {context.description} </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
