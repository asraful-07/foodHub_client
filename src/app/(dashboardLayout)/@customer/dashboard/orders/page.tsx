"use client";

import React, { useEffect, useState } from "react";
import { Order } from "@/types";
import { RefreshCw } from "lucide-react";
import LoadingSpinner from "@/components/modules/home/LoadingSpinner";
import OrdersTable from "@/components/modules/customer/OrderTable";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    setError(null);

    fetch("https://foodhunt-eight.vercel.app/api/order", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.data);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderUpdate = (orderId: string, newStatus: string) => {
    // Optimistically update the UI
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as any } : order,
      ),
    );
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
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Error loading orders</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-3 px-4 py-2 text-sm rounded-md bg-red-100 hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground mt-1">Manage your orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border hover:bg-accent transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <OrdersTable orders={orders} onOrderUpdate={handleOrderUpdate} />
    </div>
  );
}
