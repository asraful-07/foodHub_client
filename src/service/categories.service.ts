const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getCategories: async () => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/categories`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      return await res.json();
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
  },
};
