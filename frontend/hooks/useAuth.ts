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
    };

    const signup = async (username: string, email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Signup failed");
            } else {
                const data = await res.json();
                if (data) return await login(email, password);
            }
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Signup failed"
                    : "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        const res = await fetch(`${process.env.API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Logout failed");
        }
    };

    return {
        error,
        loading,
        login,
        signup,
        logout,
    }
}