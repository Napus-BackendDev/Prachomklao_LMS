"use client";
import { Sidebar } from "@/components/sidebar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  getKeyValue,
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
  useDisclosure,
} from "@heroui/react";
import { EyeIcon, EditIcon, DeleteIcon, Plus } from "lucide-react";
import React from "react";
import { useCallback, useState } from "react";
import { CreateCourseModal } from "./components/createCourseModal";

const coursesData = [
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องช่วยหายใจ ( Ventilator )",
    code: "MEDNUR-101",
    picture: "https://img.youtube.com/vi/hFgiweAHkXQ/0.jpg",
    link: "/courses/MEDNUR-101",
  },
  {
    title: "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้ตู้อบ (Incubator)",
    code: "HSC-201",
    picture: "https://img.youtube.com/vi/PEYZoVI9M_c/0.jpg",
    link: "/courses/HSC-201",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่ได้รับการรักษาภาวะตัวเหลืองด้วยเครื่องส่องไฟ Phototherapy",
    code: "CLNC-310",
    picture: "https://img.youtube.com/vi/JHm4GsMhygM/0.jpg",
    link: "/courses/CLNC-310",
  },
  {
    title:
      "การพยาบาลผู้ป่วยที่มีความจำเป็นต้องใช้เครื่องให้ความร้อนแบบแผ่รังสี ( Radiant warmer )",
    code: "MEDNUR-405",
    picture: "https://img.youtube.com/vi/ck4RGeoHFko/0.jpg",
    link: "/courses/MEDNUR-405",
  },
];

const columns = [
  { key: "picture", label: "Picture", uid: "picture" },
  { key: "code", label: "Course Code", uid: "code" },
  { key: "title", label: "Course Title", uid: "title" },
  { key: "actions", label: "Actions", uid: "actions" },
];

type Course = (typeof coursesData)[0];

export default function DashboardPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderCell = useCallback((course: Course, columnKey: string) => {
    const cellValue = course[columnKey as keyof Course];
    switch (columnKey) {
      case "picture":
        return (
          <Image
            src={course.picture}
            className="object-cover w-30 h-20 rounded"
          />
        );
      case "code":
        return <p>{course.code}</p>;
      case "title":
        return <p>{course.title}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-5">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon className=" w-5 h-5" />
              </span>
            </Tooltip>
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

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(coursesData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return coursesData.slice(start, end);
  }, [page, coursesData]);

  return (
    <div className="min-h-screen bg-[#f3f5ff] flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Card className="flex px-3">
            <CardHeader className="text-2xl font-bold p-4">
              <h1>Courses List</h1>
            </CardHeader>
            <CardBody className="space-y-4 mb-4">
              <div className="w-full flex justify-between gap-4">
                <Input placeholder="Search courses..." />
                <Button variant="flat" color="success" endContent={<Plus />} onPress={onOpen}>
                  Add New Course
                </Button>
              </div>
              <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
              >
                <TableHeader>
                  {columns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  ))}
                </TableHeader>
                <TableBody items={items}>
                  {items.map((row) => (
                    <TableRow key={row.code}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCell(row, String(columnKey))}
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

      <CreateCourseModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
