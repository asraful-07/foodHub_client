"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Fake stats
  const stats = [
    { title: "Total Meals", value: 29 },
    { title: "Orders Today", value: 10 },
    { title: "Total Earnings", value: "$190" },
  ];

  // Fake sales data for chart
  const salesData = [
    { day: "Mon", orders: 3 },
    { day: "Tue", orders: 5 },
    { day: "Wed", orders: 2 },
    { day: "Thu", orders: 10 },
    { day: "Fri", orders: 4 },
    { day: "Sat", orders: 7 },
    { day: "Sun", orders: 6 },
  ];

  // Fake recent orders
  const recentOrders = [
    {
      customer: "leonel messi",
      meal: "Pizza",
      status: "Pending",
      total: "$12",
      date: "01-02-2026",
    },
    {
      customer: "Rahat",
      meal: "Burger",
      status: "Delivered",
      total: "$10",
      date: "31-01-2026",
    },
    {
      customer: "Ali",
      meal: "Pasta",
      status: "Pending",
      total: "$15",
      date: "31-01-2026",
    },
    {
      customer: "MS Dhoni",
      meal: "Salad",
      status: "Delivered",
      total: "$8",
      date: "30-01-2026",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50 via-white to-orange-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Welcome,Provider!</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-6 bg-orange-100 rounded-lg shadow flex flex-col items-center"
          >
            <p className="text-gray-700">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Weekly Orders</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Meal</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-orange-50">
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">{order.meal}</td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-2 px-4">{order.total}</td>
                  <td className="py-2 px-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
