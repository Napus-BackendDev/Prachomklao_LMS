'use client'

import { Sidebar } from "@/components/sidebar";
import useUser from "@/hooks/useUser";
import { User } from "@/types/user";
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
import { SearchIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const columns = [
    { label: "Username", uid: "username" },
    { label: "Email", uid: "email" },
    { label: "Role", uid: "role" },
];

export default function UserAdminPage() {
    const { users } = useUser()
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
        const cellValue = user[columnKey as keyof User];
        switch (columnKey) {
            case "username":
                return <p>{user.username ?? "-"}</p>;
            case "email":
                return <p>{user.email}</p>;
            case "role":
                return <p>{user.role}</p>;
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="flex-1 p-6 text-lg">
                <Card className="flex p-3">
                    <CardHeader className="text-4xl font-bold">
                        <p>USERS</p>
                    </CardHeader>
                    <CardBody className="space-y-4 mb-4 text-lg">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%] text-lg"
                            placeholder="Search user..."
                            startContent={<SearchIcon size="20" />}
                            value={search}
                            onClear={() => setSearch("")}
                            onValueChange={setSearch}
                        />
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
                            <TableHeader>
                                {columns.map((column) => (
                                    <TableColumn key={column.uid} className="text-lg">
                                        {column.label}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {searchedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        {(columnKey) => (
                                            <TableCell className="text-lg">
                                                {renderCell(user, String(columnKey))}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}