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
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            return data;
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
            const res = await fetch(`${process.env.API_URL}/register`, {
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
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Signup failed");

            await login(email, password);
            return data;
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
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            })
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Logout failed");

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Logout failed"
                    : "Logout failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/resetpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: "include"
            })
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Reset password failed");

            return data;
        } catch (err) {
            setError(
                err && typeof err === "object" && "message" in err
                    ? (err as { message?: string }).message || "Reset password failed"
                    : "Reset password failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        error,
        loading,
        login,
        signup,
        logout,
        resetPassword,
    }
}