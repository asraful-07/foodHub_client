"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import LoadingSpinner from "@/components/modules/home/LoadingSpinner";
import OrderTable from "@/components/modules/admin/OrderTable";

export default function OrdersPage() {
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

  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Error loading orders</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground mt-1">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 text-sm rounded-md border hover:bg-accent"
        >
          Refresh
        </button>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}
