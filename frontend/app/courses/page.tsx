"use client";

import CourseCard from "@/components/ui/courseCard";
import UseCourses from "@/hooks/useCourses";
import { Courses } from "@/types/couses";
import { Divider, Input, Pagination } from "@heroui/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function CoursesPage() {
  const { courses } = UseCourses();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    filtered = filtered.filter((course: Courses) =>
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
          {filteredCourses.slice(startCourse, endCourse).map((course: Courses) => (
            <CourseCard
              key={course.id}
              title={course.title}
              id={course.id ?? ""}
              picture={course.urlPicture ?? ""}
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
