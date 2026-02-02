"use client";

import { Order } from "@/types";
import React, { useState } from "react";
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

interface OrdersTableProps {
  orders: Order[];
  onOrderUpdate?: (orderId: string, newStatus: string) => void;
}

export default function OrdersTable({
  orders,
  onOrderUpdate,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      PLACED: "bg-blue-500",
      PREPARING: "bg-yellow-500",
      READY: "bg-green-500",
      DELIVERED: "bg-gray-500",
      CANCELLED: "bg-red-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
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

  const handleViewOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/order/${orderId}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (data.success && data.data) {
        console.log("Order data received:", data.data); // Debug log
        setSelectedOrder(data.data);
        setIsViewDialogOpen(true);
      } else {
        toast.error("Failed to fetch order details");
      }
    } catch (error) {
      toast.error("Error loading order details");
      console.error("Error fetching order:", error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);

    try {
      const response = await fetch(
        `http://localhost:5001/api/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        onOrderUpdate?.(orderId, newStatus);
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error("An error occurred while updating order status");
      console.error("Error updating order:", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    #{order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {order?.customer?.name || "N/A"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order?.customer?.email || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {getTotalItems(order.items)}
                    </span>{" "}
                    items
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${order?.totalPrice?.toFixed(2) || "0.00"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value)
                      }
                      disabled={updatingOrderId === order.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLACED">
                          <Badge className="bg-blue-500">PLACED</Badge>
                        </SelectItem>
                        <SelectItem value="PREPARING">
                          <Badge className="bg-yellow-500">PREPARING</Badge>
                        </SelectItem>
                        <SelectItem value="READY">
                          <Badge className="bg-green-500">READY</Badge>
                        </SelectItem>
                        <SelectItem value="DELIVERED">
                          <Badge className="bg-gray-500">DELIVERED</Badge>
                        </SelectItem>
                        <SelectItem value="CANCELLED">
                          <Badge className="bg-red-500">CANCELLED</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order?.id)}
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

      {/* View Order Dialog */}
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
              {/* Status */}
              <div>
                <Badge
                  className={`${getStatusColor(selectedOrder.status)} text-lg px-4 py-1`}
                >
                  {selectedOrder.status}
                </Badge>
              </div>

              {/* Customer Info */}
              {selectedOrder.customer && (
                <div className="rounded-lg border p-4 space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Information
                  </h3>
                  <div className="grid gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">
                        {selectedOrder.customer.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">
                        {selectedOrder.customer.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {selectedOrder.deliveryAddress && (
                <div className="rounded-lg border p-4 space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </h3>
                  <p className="text-sm">{selectedOrder.deliveryAddress}</p>
                </div>
              )}

              {/* Order Items */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="rounded-lg border p-4 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            {item?.meal?.name || "Unknown Item"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item?.meal?.price?.toFixed(2) || "0.00"} ×{" "}
                            {item?.quantity || 0}
                          </p>
                        </div>
                        <p className="font-semibold">
                          $
                          {(
                            (item?.meal?.price || 0) * (item?.quantity || 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="rounded-lg border bg-muted p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Total Price
                  </span>
                  <span className="text-2xl font-bold">
                    ${selectedOrder?.totalPrice?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

              {/* Timestamps */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timeline
                </h3>
                <div className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">
                      {selectedOrder.createdAt
                        ? formatDate(selectedOrder.createdAt)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">
                      {selectedOrder.updatedAt
                        ? formatDate(selectedOrder.updatedAt)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No order data available
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
