"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Loader2,
} from "lucide-react";
import { Order } from "@/types";

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  updatingOrderId: string | null;
}

export default function OrderDetailsModal({
  order,
  open,
  onOpenChange,
  onStatusUpdate,
  updatingOrderId,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";
      case "PREPARING":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "PLACED":
        return <Package className="w-4 h-4" />;
      case "PREPARING":
        return <Clock className="w-4 h-4" />;
      case "DELIVERED":
        return <CheckCircle2 className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Order #{order.id.slice(0, 8)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <Badge
              className={`${getStatusColor(order.status)} flex items-center gap-1 text-base px-4 py-2`}
            >
              {getStatusIcon(order.status)}
              {order.status}
            </Badge>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Status Update Dropdown - Only for PLACED */}
          {order.status === "PLACED" && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Update Order Status
              </label>
              <Select
                disabled={updatingOrderId === order.id}
                onValueChange={(value) => onStatusUpdate(order.id, value)}
                value={order.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLACED">PLACED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
              {updatingOrderId === order.id && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating status...
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* Provider Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Restaurant</h4>
            <p className="text-lg font-semibold text-gray-700">
              {order.provider.restaurantName}
            </p>
            <p className="text-sm text-gray-500">{order.provider.address}</p>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </h4>
            <p className="text-gray-700">{order.deliveryAddress}</p>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.meal.image[0]}
                      alt={item.meal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">
                      {item.meal.name}
                    </h5>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {item.meal.category.name}
                    </Badge>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-semibold text-green-700">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-green-700 text-2xl">
              ৳{order.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
