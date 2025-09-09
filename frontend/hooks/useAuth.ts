import { useState } from "react";
import useStudent from "./useStudent";

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
            } else {
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
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            } else {
                await login(email, password);
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
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Logout failed");
        } else {
            return data;
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