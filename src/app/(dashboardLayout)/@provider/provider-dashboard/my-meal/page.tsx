// app/my-meals/page.tsx
"use client";

import MyMealTable from "@/components/provider/MyMealTable";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/modules/home/LoadingSpinner";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  dietaryPreferences: string;
  image: string[];
  category: {
    id: string;
    name: string;
  };
}

export default function MyMealsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://foodhunt-eight.vercel.app/api/meals/provider/menu",
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setMeals(data.data);
      } else {
        setError(data.message || "Failed to fetch meals");
      }
    } catch (err) {
      setError("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
      const res = await fetch(
        `https://foodhunt-eight.vercel.app/api/meals/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setMeals(meals.filter((meal) => meal.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete meal");
    }
  };

  const handleRefresh = () => {
    fetchMeals();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive">Error: {error}</p>
        <Button onClick={fetchMeals}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button onClick={() => router.push("/provider-dashboard/add-meal")}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Meal
          </Button>
        </div>
      </div>

      <MyMealTable
        meals={meals}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
