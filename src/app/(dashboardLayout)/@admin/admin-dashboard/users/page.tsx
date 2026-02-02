"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import UsersTable from "@/components/modules/admin/UsersTable";
import LoadingSpinner from "@/components/modules/home/LoadingSpinner";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch("http://localhost:5001/api/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusUpdate = (userId: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <UsersTable users={users} onStatusUpdate={handleStatusUpdate} />
    </div>
  );
}
