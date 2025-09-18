"use client";

import useCourses from "@/hooks/useCourses";
import useUser from "@/hooks/useUser";
import { useWeeklyUserBarChart } from "@/hooks/useUser";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Pagination,
} from "@heroui/react";
import { Users, BookOpen, ChartColumn, ChartPie } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAsyncList } from "@react-stately/data";
import { formatDate } from "@/public/util/fromatData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const weeklyUserOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 15 },
      grid: { color: "#e5e7eb" },
    },
    x: {
      grid: { display: false },
    },
  },
};

const coursePieOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  cutout: "0%",
  responsive: true,
  maintainAspectRatio: false,
};

export default function DashboardPage() {
  const { users } = useUser();
  const { courses } = useCourses();
  const { chartData, loading } = useWeeklyUserBarChart();
  const [isLoading, setIsLoading] = useState(false);

  // Pie Chart: สร้างข้อมูลจาก courses API
  const coursePieData = useMemo(() => {
    // รวม studentTotal ตาม category
    const categoryMap: Record<string, number> = {};
    courses.forEach((course) => {
      const category = course.title || "Other";
      categoryMap[category] = (categoryMap[category] || 0) + (course.totalStudent || 0);
    });

    const labels = Object.keys(categoryMap);
    const data = labels.map((label) => categoryMap[label]);

    // สีสำหรับแต่ละ category (เพิ่มหรือลดได้)
    const colors = [
      "rgba(59, 130, 246, 0.7)",
      "rgba(253, 224, 71, 0.7)",
      "rgba(147, 197, 253, 0.7)",
      "rgba(253, 224, 171, 0.7)",
      "rgba(34,197,94,0.7)",
      "rgba(244,63,94,0.7)",
      "rgba(168,85,247,0.7)",
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, idx) => colors[idx % colors.length]),
          borderWidth: 0,
        },
      ],
    };
  }, [courses]);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
        method: "GET",
        credentials: "include",
        signal,
      });
      let json = await res.json();
      setIsLoading(false);
      return {
        items: json,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const aObj = a as Record<string, string>;
          const bObj = b as Record<string, string>;
          let first = aObj[sortDescriptor.column];
          let second = bObj[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const pages = useMemo(() => {
    return Math.ceil(list.items.length / rowsPerPage);
  }, [list.items, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list]);

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 w-full justify-between gap-8 px-8 py-6"
        id="stats"
      >
        {/* Total Users Card */}
        <Card className="w-full">
          <CardBody className="flex flex-col justify-center gap-2">
            <div className="flex justify-between">
              <h3 className="font-bold">Total Users</h3>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600">{users.length}</p>
          </CardBody>
        </Card>

        {/* Total Courses Card */}
        <Card className="w-full">
          <CardBody className="flex flex-col justify-center gap-2">
            <div className="flex justify-between">
              <h3 className="font-bold">Total Courses</h3>
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600">{courses.length}</p>
          </CardBody>
        </Card>

      </div>

      {/* Graph */}
      <div className="grid grid-cols-2 gap-8 px-8 pb-6" id="table">
        {/* Weekly New Users Graph */}
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start">
            <div className="flex gap-2 ">
              <ChartColumn className="w-6 h-6 text-blue-600 " />
              <h3 className="font-bold">Weekly New Users</h3>
            </div>
            <p className="text-gray-600">New user registrations this week</p>
          </CardHeader>
          <CardBody className="w-full ">
            <Bar data={chartData} options={weeklyUserOptions} />
          </CardBody>
        </Card>

        {/* Course Registration Graph */}
        <Card className="w-full">
          <CardHeader className="flex flex-col items-start">
            <div className="flex gap-2 ">
              <ChartPie className="w-6 h-6 text-blue-600 " />
              <h3 className="font-bold">Course Registrations</h3>
            </div>
            <p className="text-gray-600">Registrations by course category</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center gap-8">
            <div className="w-1/2 min-w-[180px] h-56">
              <Pie data={coursePieData} options={coursePieOptions} />
            </div>
            <div className="grid w-full grid-cols-2 gap-3">
              {coursePieData.labels.map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{
                      background: coursePieData.datasets[0].backgroundColor[
                        idx
                      ] as string,
                    }}
                  />
                  <span className="text-gray-700">{label}</span>
                  <span className="text-gray-400 font-semibold">
                    {coursePieData.datasets[0].data[idx]}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="mx-8">
        <CardHeader className="flex flex-col items-start">
          <h1 className="text-2xl font-bold ">Recent Users</h1>
          <p>Latest user activities and system updates</p>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Example table with client side sorting"
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
            bottomContentPlacement="outside"
            sortDescriptor={
              list.sortDescriptor ?? {
                column: "username",
                direction: "ascending",
              }
            }
            onSortChange={list.sort}
          >
            <TableHeader>
              <TableColumn key="username" allowsSorting>
                Username
              </TableColumn>
              <TableColumn key="email" allowsSorting>
                Email
              </TableColumn>
              <TableColumn key="role" allowsSorting>
                Role
              </TableColumn>
              <TableColumn key="createdAt" allowsSorting>
                DateAcc
              </TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              items={items
                .filter(
                  (item) =>
                    typeof item === "object" &&
                    item !== null &&
                    (item as { role?: string }).role !== "Admin"
                )
                .map((item) =>
                  typeof item === "object" && item !== null
                    ? {
                      ...item,
                      createdAt: formatDate((item as any).createdAt),
                    }
                    : item
                )}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item) => {
                const typedItem = item as {
                  username: string;
                  [key: string]: any;
                };
                return (
                  <TableRow key={typedItem.username}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(typedItem, columnKey)}</TableCell>
                    )}
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
