"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function MealFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-end">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search meals..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => updateFilter("search", e.target.value)}
        className="max-w-xs"
      />

      {/* Cuisine Filter */}
      <Select
        defaultValue={searchParams.get("cuisine") || "all"}
        onValueChange={(value) => updateFilter("cuisine", value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Cuisine" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cuisines</SelectItem>
          <SelectItem value="italian">Italian</SelectItem>
          <SelectItem value="chinese">Chinese</SelectItem>
          <SelectItem value="indian">Indian</SelectItem>
          <SelectItem value="mexican">Mexican</SelectItem>
        </SelectContent>
      </Select>

      {/* Dietary Preference */}
      <Select
        defaultValue={searchParams.get("dietaryPreference") || "all"}
        onValueChange={(value) => updateFilter("dietaryPreference", value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Dietary" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="gluten-free">Gluten Free</SelectItem>
        </SelectContent>
      </Select>

      {/* Max Price Filter */}
      <Select
        defaultValue={searchParams.get("maxPrice") || "all"}
        onValueChange={(value) => updateFilter("maxPrice", value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Max Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Price</SelectItem>
          <SelectItem value="10">Under $10</SelectItem>
          <SelectItem value="20">Under $20</SelectItem>
          <SelectItem value="30">Under $30</SelectItem>
          <SelectItem value="50">Under $50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
