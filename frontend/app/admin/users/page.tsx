'use client'

import useUser from "@/hooks/useUser";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import { Eye, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import CoursesAccordion from "./_components/coursesAccordion";
import { AdminCourse } from "@/types/couses";
import { User } from "@/types/user";

const columns = [
    { label: "Username", uid: "username" },
    { label: "Email", uid: "email" },
    { label: "Role", uid: "role" },
    { label: "Courses", uid: "courses" },
];

export default function UserAdminPage() {
    const { users, fetchUsersById } = useUser()
    const [courses, setCourses] = useState<AdminCourse[]>([]);
    const [userId, setUserId] = useState("");
    const [isCousesOpen, setIsCousesOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const rowsPerPage = 10;

    const userPerPage = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const searchedUsers = useMemo(() => {
        if (search) {
            return users.filter((user) =>
                user.username?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())
            );
        } else {
            return userPerPage;
        }
    }, [users, search, userPerPage]);

    const pages = Math.ceil((search ? searchedUsers.length : users.length) / rowsPerPage);

    const renderCell = useCallback((user: User, columnKey: string) => {
        switch (columnKey) {
            case "username":
                return <p>{user.username ?? "-"}</p>;
            case "email":
                return <p>{user.email}</p>;
            case "role":
                return <p>{user.role}</p>;
            case "courses":
                return (
                    <div
                        className="flex justify-end text-default-600 hover:text-primary cursor-pointer"
                        onClick={() => setUserId(user.id)}
                    >
                        <Eye />
                    </div>
                );
            default:
                return null;
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            const user = await fetchUsersById(userId);
            setCourses(user.courses);
            setIsCousesOpen(true);
        };

        fetchData();
    }, [userId]);

    return (
        <>
            <div className="flex-1 p-6 text-xl">
                <Card className="flex p-3">
                    <CardHeader className="text-4xl font-bold">
                        <p>USERS</p>
                    </CardHeader>
                    <CardBody className="space-y-4 mb-4 text-xl">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%] text-xl"
                            placeholder="ค้นหาผู้ใช้"
                            startContent={<SearchIcon size="20" />}
                            value={search}
                            onClear={() => setSearch("")}
                            onValueChange={setSearch}
                        />
                        <Table
                            aria-label="Example table with dynamic content"
                            className="text-xl"
                            bottomContent={
                                <div className="flex w-full justify-center text-xl">
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
                                    <TableColumn key={column.uid} align={column.uid === "courses" ? "end" : "start"} className="text-xl">
                                        {column.label}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {searchedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        {(columnKey) => (
                                            <TableCell className="text-xl">
                                                {renderCell(user, String(columnKey))}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                <CoursesAccordion
                    isOpen={isCousesOpen}
                    onClose={() => setIsCousesOpen(false)}
                    courses={courses}
                />
            </div>
        </>
    )
}