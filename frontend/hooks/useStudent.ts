import { Students } from "@/types/students";
import { useEffect, useState } from "react"

export default function useStudent() {
  const [student, setStudent] = useState<Students | null>(null);
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
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch students");
      }

      setStudent(data);
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

  useEffect(() => {
    fetchStudent();
  }, []);

  return {
    student,
    setStudent,
    fetchStudent,
    error,
    loading
  }
}