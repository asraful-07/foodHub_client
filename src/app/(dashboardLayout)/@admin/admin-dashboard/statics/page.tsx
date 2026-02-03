// app/statistics/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Store,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";

// Type for stats
interface Stats {
  totalMeals: number;
  availableMeals: number;
  outOfStockMeals: number;
  totalOrders: number;
  placedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalProviders: number;
  totalCustomers: number;
}

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);

  // Fake data generator
  const fakeStats: Stats = {
    totalMeals: 17,
    availableMeals: 8,
    outOfStockMeals: 4,
    totalOrders: 12,
    placedOrders: 6,
    preparingOrders: 3,
    readyOrders: 7,
    deliveredOrders: 4,
    cancelledOrders: 8,
    totalProviders: 4,
    totalCustomers: 7,
  };

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setStats(fakeStats);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) return null;

  // Prepare data for charts
  const mealStatsData = [
    { name: "Available", value: stats.availableMeals, color: "#10b981" },
    { name: "Out of Stock", value: stats.outOfStockMeals, color: "#ef4444" },
  ];

  const orderStatusData = [
    { name: "Placed", value: stats.placedOrders, color: "#3b82f6" },
    { name: "Preparing", value: stats.preparingOrders, color: "#f59e0b" },
    { name: "Ready", value: stats.readyOrders, color: "#8b5cf6" },
    { name: "Delivered", value: stats.deliveredOrders, color: "#10b981" },
    { name: "Cancelled", value: stats.cancelledOrders, color: "#ef4444" },
  ];

  const userStatsData = [
    { name: "Providers", value: stats.totalProviders, color: "#06b6d4" },
    { name: "Customers", value: stats.totalCustomers, color: "#ec4899" },
  ];

  const orderFlowData = [
    { stage: "Placed", count: stats.placedOrders },
    { stage: "Preparing", count: stats.preparingOrders },
    { stage: "Ready", count: stats.readyOrders },
    { stage: "Delivered", count: stats.deliveredOrders },
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
        <Button variant="outline" onClick={() => setStats(fakeStats)}>
          Refresh
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Meals
            </CardTitle>
            <UtensilsCrossed className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              {stats.totalMeals}
            </div>
            <p className="text-xs text-blue-700 mt-1">
              {stats.availableMeals} available
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-purple-900">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              {stats.totalOrders}
            </div>
            <p className="text-xs text-purple-700 mt-1">
              {stats.deliveredOrders} delivered
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-cyan-900">
              Total Providers
            </CardTitle>
            <Store className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-900">
              {stats.totalProviders}
            </div>
            <p className="text-xs text-cyan-700 mt-1">Active providers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-pink-900">
              Total Customers
            </CardTitle>
            <Users className="h-5 w-5 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-900">
              {stats.totalCustomers}
            </div>
            <p className="text-xs text-pink-700 mt-1">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Meal Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mealStatsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mealStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStatsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Order Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
