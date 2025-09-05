import { useState } from "react";

export default function useAuth() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: "include"
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Login failed");
            } else {
                const data = await res.json();
                console.log(data)
                return data;
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
        error,
        loading,
        login,
    }
}