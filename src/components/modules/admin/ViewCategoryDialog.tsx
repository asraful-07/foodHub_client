// components/admin/ViewCategoryDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Hash } from "lucide-react";
import { format } from "date-fns";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ViewCategoryDialogProps {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewCategoryDialog({
  category,
  open,
  onOpenChange,
}: ViewCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Name */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Category Name
            </h3>
            <p className="text-2xl font-bold">{category.name}</p>
          </div>

          {/* Category ID */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Category ID
            </h3>
            <Badge variant="outline" className="font-mono text-xs">
              {category.id}
            </Badge>
          </div>

          {/* Created At */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Created At
            </h3>
            <p className="text-base">
              {format(new Date(category.createdAt), "PPpp")}
            </p>
          </div>

          {/* Updated At */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last Updated
            </h3>
            <p className="text-base">
              {format(new Date(category.updatedAt), "PPpp")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
