import { cookies } from "next/headers";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMealsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
  category?: string;
  cuisine?: string;
  dietaryPreference?: string;
  maxPrice?: string;
}

export const mealService = {
  getMeals: async (params?: GetMealsParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${NEXT_PUBLIC_API_URL}/api/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit & { next?: { revalidate?: number } } = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(url.toString(), config);

      if (!res.ok) throw new Error("Failed to fetch meals");

      const result = await res.json();

      return {
        data: result.data,
        success: result.success,
        message: result.message,
        error: null,
      };
    } catch (err: any) {
      console.error("Meal fetch error:", err.message);

      return {
        data: null,
        success: false,
        message: null,
        error: err.message || "Something went wrong",
      };
    }
  },

  createMeal: async (mealData: any) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.message || "Meal not created." },
        };
      }

      return { data: data.data, error: null };
    } catch (err: any) {
      console.error("Meal creation error:", err);
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },

  getMealById: async (id: string, options?: ServiceOptions) => {
    try {
      const config: RequestInit & { next?: { revalidate?: number } } = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, config);

      if (!res.ok) throw new Error("Failed to fetch meal");

      const result = await res.json();

      return {
        data: result.data,
        success: result.success,
        message: result.message,
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: null,
        error: err.message || "Something went wrong",
      };
    }
  },

  updateMeal: async (id: string, mealData: any) => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          data: null,
          error: { message: data.message || "Meal not updated." },
        };
      }

      return { data: data.data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },

  deleteMeal: async (id: string) => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        return {
          success: false,
          error: { message: data.message || "Meal not deleted." },
        };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return {
        success: false,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};
