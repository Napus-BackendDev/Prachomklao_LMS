"use client";

import CourseCard from "@/components/ui/courseCard";
import { Divider, Input, Pagination } from "@heroui/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

// Mock up
const courses = [
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
      "Pagination Test",
    code: "TEST-01",
    url: "https://img.youtube.com/vi/ck4RGeoHFko/0.jpg",
    link: "/courses/TEST-01",
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    filtered = filtered.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    )

    return filtered
  }, [courses, search])

  const coursesPerPage = 8;
  const totalPage = Math.ceil(filteredCourses.length / coursesPerPage);
  const startCourse = (page - 1) * coursesPerPage;
  const endCourse = startCourse + coursesPerPage;

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4">
      <div className="flex w-full gap-10 mb-4">
        <Input
          isClearable
          placeholder="Search Courses"
          startContent={<Search className="text-default-400 pointer-events-none" size={20} />}
          value={search}
          onValueChange={(value) => {setSearch(value); setPage(1);}}
          onClear={() => {setSearch(""); setPage(1);}}
          classNames={{
            input: "text-xl"
          }}
        />
      </div>
      <div>
        <p className="text-xl">ผลลัพธ์จำนวน {filteredCourses.length} วิชา</p>
        <Divider className="my-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
          {filteredCourses.slice(startCourse, endCourse).map((course) => (
            <CourseCard
              key={course.code}
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
        page={page}
        total={totalPage}
        onChange={setPage}
        size="lg"
        className="flex items-center justify-center w-full my-2 cursor-pointer"
      />
    </div>
  );
}
