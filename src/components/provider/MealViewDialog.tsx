"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

interface MealViewDialogProps {
  meal: Meal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MealViewDialog({
  meal,
  open,
  onOpenChange,
}: MealViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{meal.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            {meal.image.map((img, index) => (
              <div
                key={index}
                className="relative h-48 rounded-lg overflow-hidden"
              >
                <Image
                  src={img || "/placeholder.png"}
                  alt={`${meal.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{meal.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <Badge variant="outline">{meal.category?.name || "N/A"}</Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dietary Preferences</h3>
                <Badge variant="outline">{meal.dietaryPreferences}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-2xl font-bold">${meal.price.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Stock</h3>
                <Badge variant={meal.stock > 10 ? "default" : "destructive"}>
                  {meal.stock} items
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Availability</h3>
              <Badge
                variant={meal.isAvailable ? "default" : "secondary"}
                className={
                  meal.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {meal.isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
