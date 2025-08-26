"use client";

import { CourseCard } from "@/public/components/courseCard";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Pagination } from "@heroui/react";

const coursesData = [
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ ( Ventilator )",
    code: "MEDNUR-101",
    url: "https://img.youtube.com/vi/hFgiweAHkXQ/0.jpg",
    link: "/courses/MEDNUR-101",
  },
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้ตู้อบ (Incubator)",
    code: "HSC-201",
    url: "https://img.youtube.com/vi/PEYZoVI9M_c/0.jpg",
    link: "/courses/HSC-201",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่ได้รับการรักษาภาวะตัวเหลืองด้วยเครื่องส่องไฟ Phototherapy",
    code: "CLNC-310",
    url: "https://img.youtube.com/vi/JHm4GsMhygM/0.jpg",
    link: "/courses/CLNC-310",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องให้ความร้อนแบบแผ่รังสี ( Radiant warmer )",
    code: "MEDNUR-405",
    url: "https://img.youtube.com/vi/ck4RGeoHFko/0.jpg",
    link: "/courses/MEDNUR-405",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ ( Ventilator )",
    code: "MEDNUR-101",
    url: "https://img.youtube.com/vi/hFgiweAHkXQ/0.jpg",
    link: "/courses/MEDNUR-101",
  },
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้ตู้อบ (Incubator)",
    code: "HSC-201",
    url: "https://img.youtube.com/vi/PEYZoVI9M_c/0.jpg",
    link: "/courses/HSC-201",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่ได้รับการรักษาภาวะตัวเหลืองด้วยเครื่องส่องไฟ Phototherapy",
    code: "CLNC-310",
    url: "https://img.youtube.com/vi/JHm4GsMhygM/0.jpg",
    link: "/courses/CLNC-310",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องให้ความร้อนแบบแผ่รังสี ( Radiant warmer )",
    code: "MEDNUR-405",
    url: "https://img.youtube.com/vi/ck4RGeoHFko/0.jpg",
    link: "/courses/MEDNUR-405",
  }
];

export default function CoursesPage() {
  return (
    <>
      <div className="flex flex-col w-full px-26 py-4">
        <div className="flex w-full gap-10 mb-4">
          <Input
            placeholder="Search Courses"
            startContent={
              <Search className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            type="text"
          />
          <div className="flex gap-4">
            <Button
              color="success"
              variant="flat"
              className="border-success border-2"
            >
              Search
            </Button>
            <Button color="danger" variant="shadow">
              Remove
            </Button>
          </div>
        </div>
        <div className="">
          <h1>ผลลัพธ์ จำนวน 8 วิชา</h1>
          <hr className="flex-1 border-t border-gray-300" aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
            {coursesData.map((course) => (
              <CourseCard
                title={course.title}
                code={course.code}
                url={course.url}
              />
            ))}
          </div>
        </div>
        <Pagination
          isCompact
          showControls
          initialPage={1}
          total={10}
          className="flex items-center justify-center w-full"
        />
      </div>
    </>
  );
}
