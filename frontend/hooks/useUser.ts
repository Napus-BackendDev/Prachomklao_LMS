import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function useUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.API_URL}/admin`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch users")
            }

            setUsers(data);
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Failed to fetch users"
                    : "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return {
        users,
        error,
        loading,
        fetchUsers,
    }
}