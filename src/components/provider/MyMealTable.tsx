"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MealViewDialog from "./MealViewDialog";
import MealEditDialog from "./MealEditDialog";

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

interface MyMealTableProps {
  meals: Meal[];
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function MyMealTable({
  meals,
  onDelete,
  onRefresh,
}: MyMealTableProps) {
  const router = useRouter();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleView = (meal: Meal) => {
    setSelectedMeal(meal);
    setViewDialogOpen(true);
  };

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    onRefresh();
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No meals found
              </p>
              <Button onClick={() => router.push("/meals/create")}>
                Create Your First Meal
              </Button>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all your meals</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dietary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meals.map((meal) => (
                  <TableRow key={meal.id}>
                    {/* Image */}
                    <TableCell>
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={meal.image?.[0] || "/placeholder.png"}
                          alt={meal.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{meal.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {meal.description.split(" ").slice(0, 7).join(" ")}
                        </p>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>{meal.category?.name || "N/A"}</TableCell>

                    {/* Price */}
                    <TableCell className="font-semibold">
                      ${meal.price.toFixed(2)}
                    </TableCell>

                    {/* Stock */}
                    <TableCell>
                      <Badge
                        variant={meal.stock > 10 ? "default" : "destructive"}
                      >
                        {meal.stock} items
                      </Badge>
                    </TableCell>

                    {/* Availability Status */}
                    <TableCell>
                      <Badge
                        variant={meal.isAvailable ? "default" : "secondary"}
                        className={
                          meal.isAvailable
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }
                      >
                        {meal.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>

                    {/* Dietary Preferences */}
                    <TableCell>
                      <Badge variant="outline">{meal.dietaryPreferences}</Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleView(meal)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(meal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete(meal.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      {selectedMeal && (
        <MealViewDialog
          meal={selectedMeal}
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
        />
      )}

      {/* Edit Dialog */}
      {selectedMeal && (
        <MealEditDialog
          meal={selectedMeal}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
