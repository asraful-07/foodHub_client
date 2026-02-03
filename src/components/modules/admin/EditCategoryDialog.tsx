// components/admin/EditCategoryDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface EditCategoryDialogProps {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onSuccess,
}: EditCategoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [name, setName] = useState("");

  // Fetch full category details when dialog opens
  useEffect(() => {
    if (open && category.id) {
      fetchCategoryDetails();
    }
  }, [open, category.id]);

  const fetchCategoryDetails = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(
        `https://foodhunt-eight.vercel.app/api/categories/${category.id}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (data.success) {
        setName(data.data.name);
      } else {
        toast.error("Failed to load category details");
      }
    } catch (err) {
      toast.error("Failed to load category details");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://foodhunt-eight.vercel.app/api/categories/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: name.trim() }),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Category updated successfully");
        onSuccess();
      } else {
        toast.error(data.message || "Failed to update category");
      }
    } catch (err) {
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {fetchLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Chinese, Italian, Mexican"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a unique category name
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
