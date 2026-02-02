// components/modules/home/MealsCard.tsx
import { Meal } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function MealsCard({ meal }: { meal: Meal }) {
  return (
    <div>
      <Link href={`/meal/${meal.id}`}>
        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
          {/* Image */}
          <div className="relative h-48 w-64 mx-auto overflow-hidden rounded-t-2xl">
            <Image
              src={meal.image?.[0] || "/placeholder.png"}
              alt={meal.name}
              fill
              className="object-cover rounded-t-2xl"
            />
          </div>

          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{meal.name}</CardTitle>
              <p className="text-sm text-gray-500">{meal.category?.name}</p>
            </div>
          </CardHeader>

          <CardFooter className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {meal.provider?.restaurantName}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                meal.isAvailable
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {meal.isAvailable ? "Available" : "Out of stock"}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
