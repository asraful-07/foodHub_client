import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = "https://foodhunt-eight.vercel.app";

export const authService = {
  getUsers: async function () {
    try {
      const cookieStore = cookies();
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch users: ${res.status} ${text}`);
      }

      const data = await res.json();

      return {
        data: data,
        error: null,
        success: true,
      };
    } catch (err: any) {
      console.error("Get users error:", err.message);
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
        success: false,
      };
    }
  },
};
