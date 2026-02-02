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
import { Eye, Store, User, MapPin, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-500",
      CONFIRMED: "bg-blue-500",
      PREPARING: "bg-purple-500",
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

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const getTotalItems = (items: Order["items"]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
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
                      <span className="font-medium">{order.customer.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.customer.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      <span>{order.provider.restaurantName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {getTotalItems(order.items)}
                    </span>{" "}
                    items
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
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

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
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
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </h3>
                <div className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Restaurant
                </h3>
                <p className="font-medium">
                  {selectedOrder.provider.restaurantName}
                </p>
              </div>

              {/* Delivery Address */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h3>
                <p className="text-sm">{selectedOrder.deliveryAddress}</p>
              </div>

              {/* Order Items */}
              <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.meal.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.meal.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.meal.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="rounded-lg border bg-muted p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Total Price
                  </span>
                  <span className="text-2xl font-bold">
                    ${selectedOrder.totalPrice.toFixed(2)}
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
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">
                      {formatDate(selectedOrder.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
