// src/components/modules/home/MealCard.tsx
import { mealService } from "@/service/meal.service";
import React from "react";
import MealsCard from "@/components/modules/home/MealsCard";

export default async function MealCard() {
  // Server-side fetch
  const { data } = await mealService.getMeals();

  // Limit to 8 meals
  const mealsToShow = data?.slice(0, 8) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 mt-20">
      {mealsToShow.map((meal: any) => (
        <div
          key={meal.id}
          className="transform hover:-translate-y-2 transition-all duration-300"
        >
          <MealsCard meal={meal} />
        </div>
      ))}
    </div>
  );
}
