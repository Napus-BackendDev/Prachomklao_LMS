"use client";

import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
  Tooltip,
  Pagination,
  Link,
} from "@heroui/react";
import { Plus, SearchIcon, Trash, Pen } from "lucide-react";
import React, { useMemo } from "react";
import { useCallback, useState } from "react";
import useCourses from "@/hooks/useCourses";
import { CourseData, Courses } from "@/types/couses";
import ConfirmModal from "./components/confirmModal";
import CourseModal from "./components/courseModal";
import { Content, MainContent } from "@/types/content";

const columns = [
  { label: "Picture", uid: "urlPicture" },
  { label: "Title", uid: "title" },
  { label: "Code", uid: "code" },
  { label: "Link", uid: "url" },
  { label: "Actions", uid: "actions" },
];

export default function CourseAdminPage() {
  const {
    courses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse
  } = useCourses();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [courseId, setCourseId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const coursePerPage = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return courses.slice(start, end);
  }, [page, courses]);

  const searchedCourses = useMemo(() => {
    if (search) {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return coursePerPage;
    }
  }, [courses, search, coursePerPage]);

  const pages = Math.ceil((search ? searchedCourses.length : courses.length) / rowsPerPage);

  const renderCell = useCallback((course: Courses, columnKey: string) => {
    const cellValue = course[columnKey as keyof Courses];
    switch (columnKey) {
      case "urlPicture":
        return (
          <Image
            src={course.urlPicture}
            className="object-cover w-30 h-20 rounded"
          />
        );
      case "title":
        return <p>{course.title}</p>;
      case "code":
        return <p>{course.courseCode ?? "-"}</p>;
      case "url":
        return <Link href={course.url}>{course.url}</Link>;
      case "actions":
        return (
          <div className="relative flex items-center gap-5">
            <Tooltip content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={async () => {
                  if (!course.id) return;
                  const fetchCourse = await fetchCourseById(course.id);
                  setCourseId(course.id);
                  setCourse(fetchCourse);
                  setIsCourseModalOpen(true);
                }}
              >
                <Pen className=" w-5 h-5" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  if (!course.id) return;
                  setIsConfirmModalOpen(true);
                  setCourseId(course.id);
                }}
              >
                <Trash className=" w-5 h-5" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, []);

  const handleAdd = async (course: (MainContent | Content)[]) => {
    await createCourse(course);
    window.location.reload();
  };

  const handleEdit = async (course: Courses) => {
    if (!courseId) return;
    await updateCourse(courseId, course);
    window.location.reload();
  };

  const handleDelete = async () => {
    if (!courseId) return;
    await deleteCourse(courseId);
    window.location.reload();
  };

  return (
    <>
      <div className="flex-1 p-6 text-lg">
        <Card className="flex p-3 text-lg">
          <CardHeader className="text-4xl font-bold">
            <p>COURSES</p>
          </CardHeader>
          <CardBody className="space-y-4 mb-4 text-lg">
            <div className="w-full flex justify-between gap-4 text-lg">
              <Input
                isClearable
                className="w-full text-lg"
                placeholder="Search course..."
                startContent={<SearchIcon size="20" />}
                value={search}
                onClear={() => setSearch("")}
                onValueChange={setSearch}
              />
              <Button
                color="primary"
                endContent={<Plus size="20" />}
                className="text-lg"
                onPress={() => setIsCourseModalOpen(true)}
              >
                Add course
              </Button>
            </div>
            <Table
              aria-label="Example table with dynamic content"
              className="text-lg"
              bottomContent={
                <div className="flex w-full justify-center text-lg">
                  <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
            >
              <TableHeader className="text-lg">
                {columns.map((column) => (
                  <TableColumn key={column.uid} className="text-lg">
                    {column.label}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody className="text-lg">
                {searchedCourses.map((course) => (
                  <TableRow key={course.id} className="text-lg">
                    {(columnKey) => (
                      <TableCell className="text-lg">
                        {renderCell(course, String(columnKey))}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onAdd={handleAdd}
        course={course ? course : null}
        onEdit={course ? handleEdit : undefined}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}