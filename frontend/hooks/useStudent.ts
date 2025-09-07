import { useEffect, useState } from "react"

export default function useStudent() {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStudent = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/student`, {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Unauthorized");
            } else {
                const data = await res.json();
                setStudent(data);
            }
        } catch (err) {
            setError(
                err && typeof err === 'object' && 'message' in err
                    ? (err as { message?: string }).message || "Login failed"
                    : 'Login failed'
            )
        } finally {
            setLoading(false);
        }
    }

    return {
        student,
        fetchStudent,
        error,
        loading
    }
}