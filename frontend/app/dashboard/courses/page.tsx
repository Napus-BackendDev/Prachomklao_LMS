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
import { EditIcon, DeleteIcon, Plus, SearchIcon } from "lucide-react";
import React, { useMemo } from "react";
import { useCallback, useState } from "react";
import useCourses from "@/hooks/useCourses";
import { Courses } from "@/types/couses";

const columns = [
  { label: "Picture", uid: "urlPicture" },
  { label: "Title", uid: "title" },
  { label: "Code", uid: "code" },
  { label: "Link", uid: "url" },
  { label: "Actions", uid: "actions" },
];

export default function DashboardPage() {
  const { courses } = useCourses();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;
  const pages = Math.ceil(courses.length / rowsPerPage);

  const coursePerPage = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return courses.slice(start, end);
  }, [page, courses]);

  const searchedCourses = useMemo(() => {

    if (search) {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.code?.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return coursePerPage;
    }
  }, [courses, search, coursePerPage]);

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
        return <p>{course.code ?? "-"}</p>;
      case "url":
        return <Link href={course.url}>{course.url}</Link>;
      case "actions":
        return (
          <div className="relative flex items-center gap-5">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon className=" w-5 h-5" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon className=" w-5 h-5" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Card className="flex p-3">
            <CardHeader className="text-4xl font-bold">
              <h1>COURSES</h1>
            </CardHeader>
            <CardBody className="space-y-4 mb-4">
              <div className="w-full flex justify-between gap-4">
                <Input
                  isClearable
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search course..."
                  startContent={<SearchIcon size="20" />}
                  value={search}
                  onClear={() => setSearch("")}
                  onValueChange={setSearch}
                />
                <Button
                  color="primary"
                  endContent={<Plus />}
                  onPress={() => setIsCourseModalOpen(true)}
                >
                  Add course
                </Button>
              </div>
              <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                  <div className="flex w-full justify-center">
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
                <TableHeader>
                  {columns.map((column) => (
                    <TableColumn key={column.uid}>{column.label}</TableColumn>
                  ))}
                </TableHeader>
                <TableBody>
                  {searchedCourses.map((course) => (
                    <TableRow key={course.id}>
                      {(columnKey) => (
                        <TableCell>
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
      </div>
  );
}
