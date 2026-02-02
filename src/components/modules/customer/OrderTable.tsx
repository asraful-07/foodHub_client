"use client";

import React, { useState } from "react";
import { Order } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, User, MapPin, Calendar, DollarSign, Package } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

/* ================= STATUS FLOW ================= */

const STATUS_FLOW: Record<string, string[]> = {
  PLACED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

/* ================= PROPS ================= */

interface OrdersTableProps {
  orders: Order[];
  onOrderUpdate?: (orderId: string, newStatus: string) => void;
}

/* ================= COMPONENT ================= */

export default function OrdersTable({
  orders,
  onOrderUpdate,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  /* ================= HELPERS ================= */

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PLACED: "bg-blue-500",
      PREPARING: "bg-yellow-500",
      READY: "bg-green-500",
      DELIVERED: "bg-gray-500",
      CANCELLED: "bg-red-500",
    };
    return colors[status] || "bg-gray-400";
  };

  const getAllowedStatuses = (currentStatus: string) => {
    return STATUS_FLOW[currentStatus] || [];
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  const getTotalItems = (items: Order["items"]) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
  };

  /* ================= API ================= */

  const handleViewOrder = async (orderId: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/order/${orderId}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setSelectedOrder(data.data);
        setIsViewDialogOpen(true);
      } else {
        toast.error("Failed to fetch order");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);

    try {
      const res = await fetch(`http://localhost:5001/api/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Order updated to ${newStatus}`);
        onOrderUpdate?.(orderId, newStatus);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Update error");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    #{order.id.slice(0, 8)}...
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {order.customer?.name || "N/A"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.customer?.email || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{getTotalItems(order.items)} items</TableCell>

                  <TableCell className="font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>

                  {/* ===== STATUS SELECT ===== */}
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value)
                      }
                      disabled={
                        updatingOrderId === order.id ||
                        order.status === "DELIVERED" ||
                        order.status === "CANCELLED"
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {getAllowedStatuses(order.status).map((status) => (
                          <SelectItem key={status} value={status}>
                            <Badge className={getStatusColor(status)}>
                              {status}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= YOUR VIEW ORDER DIALOG ================= */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: #{selectedOrder?.id || "N/A"}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder ? (
            <div className="space-y-6">
              <Badge
                className={`${getStatusColor(
                  selectedOrder.status,
                )} text-lg px-4 py-1`}
              >
                {selectedOrder.status}
              </Badge>

              {selectedOrder.customer && (
                <div className="rounded-lg border p-4 space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Information
                  </h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span>{selectedOrder.customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder.deliveryAddress && (
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </h3>
                  <p className="text-sm">{selectedOrder.deliveryAddress}</p>
                </div>
              )}

              {selectedOrder.items?.length > 0 && (
                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Order Items
                  </h3>
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2 last:border-0"
                    >
                      <div>
                        <p className="font-medium">
                          {item.meal?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.meal?.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        $
                        {(
                          (item.meal?.price || 0) * (item.quantity || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-lg border bg-muted p-4 flex justify-between">
                <span className="flex items-center gap-2 font-semibold">
                  <DollarSign className="h-5 w-5" />
                  Total
                </span>
                <span className="text-2xl font-bold">
                  ${selectedOrder.totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="rounded-lg border p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Updated:</span>
                  <span>{formatDate(selectedOrder.updatedAt)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No order data available
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
