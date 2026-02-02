// components/modules/home/CategorySidebar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

export default function CategorySidebar({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category"); // Use "category" param

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === categoryName) {
      params.delete("category");
    } else {
      params.set("category", categoryName);
      // Remove cuisine filter when selecting a category
      params.delete("cuisine");
    }

    router.push(`?${params.toString()}`);
  };

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push(`?${params.toString()}`);
  };

  return (
    <Card className="p-4 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {selectedCategory && (
          <button
            onClick={clearCategory}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === category.name
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
