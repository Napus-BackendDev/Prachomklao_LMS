"use client";

import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardBody,
  CardHeader,
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  BookMarked,
  UsersRound,
  MessageSquareWarning,
  Bug,
} from "lucide-react";
import { useMemo, useState } from "react";

const statsData = [
  { id: 1, label: "Total Users", value: 130, icon: UsersRound, color: "blue" },
  { id: 2, label: "Total Courses", value: 5, icon: BookMarked, color: "green" },
  {
    id: 3,
    label: "Total Feedback",
    value: 5,
    icon: MessageSquareWarning,
    color: "yellow",
  },
  { id: 4, label: "Total Reports", value: 5, icon: Bug, color: "red" },
];

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const pages = useMemo(() => {
    return Math.ceil(rows.length / rowsPerPage);
  }, [rows, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <div className="min-h-screen bg-[#f3f5ff] flex flex-col">
      <div className="flex flex-1 ">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {statsData.map((stat) => (
              <Card
                className="flex flex-row border border-gray-200 p-4 items-center justify-between gap-4"
                key={stat.id}
              >
                <div className="flex gap-3 ">
                  <div
                    className={`bg-${stat.color} w-0.5 max-h-full rounded-3xl`}
                  />
                  <div>
                    <h1 className="text-xl text-gray-500">{stat.label}</h1>
                    <span className="text-xl font-bold">{stat.value}</span>
                  </div>
                </div>
                <div className={`p-1 bg-${stat.color}-800 rounded-lg`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-300`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-600 mb-2">
                Feedback Statistics
              </div>
              {/* Replace with your chart */}
              <div className="flex justify-center items-center h-40">
                <span className="text-gray-400">[Feedback Chart]</span>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                  พึงพอใจที่สุด
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-300 rounded-full"></span>
                  พอใจ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-orange-300 rounded-full"></span>
                  ปานกลาง
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  ไม่พอใจ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-700 rounded-full"></span>
                  ไม่พอใจอย่างยิ่ง
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-600 mb-2">
                Course Overview
              </div>
              {/* Replace with your chart */}
              <div className="flex justify-center items-center h-40">
                <span className="text-gray-400">[Bar Chart]</span>
              </div>
              <div className="flex justify-end mt-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded bg-blue-100 text-blue-600">
                    1
                  </button>
                  <button className="px-2 py-1 rounded text-gray-400">2</button>
                  <button className="px-2 py-1 rounded text-gray-400">3</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="py-2 px-6">
              <CardHeader className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">
                  Reports Statistics
                </span>
                <a href="#" className="text-blue-500 text-xs">
                  View more
                </a>
              </CardHeader>
              <CardBody >
                <Table
                  aria-label="Example table with dynamic content"
                  bottomContent={
                    pages > 0 ? (
                      <div className="flex w-full justify-center">
                        <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="primary"
                          page={page}
                          total={pages}
                          onChange={(page) => setPage(page)}
                        />
                      </div>
                    ) : null
                  }
                  layout="fixed"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={items}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
            <Card className="py-2 px-6">
              <CardHeader className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">
                  Latest Users
                </span>
                <a href="#" className="text-blue-500 text-xs">
                  View more
                </a>
              </CardHeader>
              <CardBody>
                <Table
                  aria-label="Example table with dynamic content"
                  bottomContent={
                    pages > 0 ? (
                      <div className="flex w-full justify-center">
                        <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="primary"
                          page={page}
                          total={pages}
                          onChange={(page) => setPage(page)}
                        />
                      </div>
                    ) : null
                  }
                  layout="fixed"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={items}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
