"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <span
      onClick={handleLogout}
      className="px-4 py-3 text-md hover:bg-orange-50 flex items-center gap-3 transition-colors duration-200 border-b"
    >
      <FaSignOutAlt className="text-orange-500" />
      Logout
    </span>
  );
}
