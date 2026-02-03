// components/admin/AddCategoryDialog.tsx
"use client";

import { useState } from "react";
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

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddCategoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://foodhunt-eight.vercel.app/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: name.trim() }),
        },
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Category created successfully");
        setName("");
        onSuccess();
      } else {
        toast.error(data.message || "Failed to create category");
      }
    } catch (err) {
      toast.error("Failed to create category");
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
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

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
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
