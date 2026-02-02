// app/categories/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import CategoriesTable from "@/components/modules/admin/CategoriesTable";
import AddCategoryDialog from "@/components/modules/admin/AddCategoryDialog";
import LoadingSpinner from "@/components/modules/home/LoadingSpinner";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5001/api/categories", {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setCategories(categories.filter((cat) => cat.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete category");
    }
  };

  const handleAddSuccess = () => {
    setDialogOpen(false);
    fetchCategories();
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
        <Button onClick={fetchCategories}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchCategories}>
            Refresh
          </Button>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <CategoriesTable
        categories={categories}
        onDelete={handleDelete}
        onRefresh={fetchCategories}
      />

      <AddCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
