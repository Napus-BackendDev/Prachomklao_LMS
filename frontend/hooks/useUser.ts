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
      const res = await fetch(`/api/admin`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    error,
    loading,
    fetchUsers,
  };
}

export function useWeeklyUserBarChart() {
  const [data, setData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklyUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/weekly-users`, {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch data");
      setData(json); // json = [จำนวนวันจันทร์, ..., อาทิตย์]
    } catch (e) {
      setData([0, 0, 0, 0, 0, 0, 0]);
      setError(
        e && typeof e === "object" && "message" in e
          ? (e as { message?: string }).message || "Failed to fetch data"
          : "Failed to fetch data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyUsers();
  }, []);

  // คืนค่าข้อมูลในรูปแบบที่ Chart.js ใช้ได้เลย
  return {
    chartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "New Users",
          data,
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderRadius: 6,
          barPercentage: 0.6,
        },
      ],
    },
    loading,
    error,
    refetch: fetchWeeklyUsers,
  };
}
