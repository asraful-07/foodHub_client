// // app/statistics/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   UtensilsCrossed,
//   ShoppingCart,
//   Users,
//   Store,
//   Package,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Truck,
// } from "lucide-react";

// interface Stats {
//   totalMeals: number;
//   availableMeals: number;
//   outOfStockMeals: number;
//   totalOrders: number;
//   placedOrders: number;
//   preparingOrders: number;
//   readyOrders: number;
//   deliveredOrders: number;
//   cancelledOrders: number;
//   totalProviders: number;
//   totalCustomers: number;
// }

// export default function StatisticsPage() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [stats, setStats] = useState<Stats | null>(null);

//   const fetchStats = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("http://localhost:5001/api/user/statics", {
//         credentials: "include",
//       });
//       const data = await res.json();

//       if (data.success) {
//         setStats(data.data);
//       } else {
//         setError(data.message || "Failed to fetch statistics");
//       }
//     } catch (err) {
//       setError("Failed to fetch statistics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//         <p className="text-destructive">Error: {error}</p>
//         <Button onClick={fetchStats}>Retry</Button>
//       </div>
//     );
//   }

//   if (!stats) return null;

//   // Prepare data for charts
//   const mealStatsData = [
//     { name: "Available", value: stats.availableMeals, color: "#10b981" },
//     { name: "Out of Stock", value: stats.outOfStockMeals, color: "#ef4444" },
//   ];

//   const orderStatusData = [
//     { name: "Placed", value: stats.placedOrders, color: "#3b82f6" },
//     { name: "Preparing", value: stats.preparingOrders, color: "#f59e0b" },
//     { name: "Ready", value: stats.readyOrders, color: "#8b5cf6" },
//     { name: "Delivered", value: stats.deliveredOrders, color: "#10b981" },
//     { name: "Cancelled", value: stats.cancelledOrders, color: "#ef4444" },
//   ];

//   const userStatsData = [
//     { name: "Providers", value: stats.totalProviders, color: "#06b6d4" },
//     { name: "Customers", value: stats.totalCustomers, color: "#ec4899" },
//   ];

//   const orderFlowData = [
//     { stage: "Placed", count: stats.placedOrders },
//     { stage: "Preparing", count: stats.preparingOrders },
//     { stage: "Ready", count: stats.readyOrders },
//     { stage: "Delivered", count: stats.deliveredOrders },
//   ];

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
//         <Button variant="outline" onClick={fetchStats}>
//           Refresh
//         </Button>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Meals */}
//         <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-blue-900">
//               Total Meals
//             </CardTitle>
//             <UtensilsCrossed className="h-5 w-5 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-blue-900">
//               {stats.totalMeals}
//             </div>
//             <p className="text-xs text-blue-700 mt-1">
//               {stats.availableMeals} available
//             </p>
//           </CardContent>
//         </Card>

//         {/* Total Orders */}
//         <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-purple-900">
//               Total Orders
//             </CardTitle>
//             <ShoppingCart className="h-5 w-5 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-purple-900">
//               {stats.totalOrders}
//             </div>
//             <p className="text-xs text-purple-700 mt-1">
//               {stats.deliveredOrders} delivered
//             </p>
//           </CardContent>
//         </Card>

//         {/* Total Providers */}
//         <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-cyan-900">
//               Total Providers
//             </CardTitle>
//             <Store className="h-5 w-5 text-cyan-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-cyan-900">
//               {stats.totalProviders}
//             </div>
//             <p className="text-xs text-cyan-700 mt-1">Active providers</p>
//           </CardContent>
//         </Card>

//         {/* Total Customers */}
//         <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-pink-900">
//               Total Customers
//             </CardTitle>
//             <Users className="h-5 w-5 text-pink-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-pink-900">
//               {stats.totalCustomers}
//             </div>
//             <p className="text-xs text-pink-700 mt-1">Registered users</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order Status Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-xs font-medium">Placed</CardTitle>
//             <Clock className="h-4 w-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.placedOrders}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-xs font-medium">Preparing</CardTitle>
//             <Package className="h-4 w-4 text-orange-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.preparingOrders}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-xs font-medium">Ready</CardTitle>
//             <CheckCircle className="h-4 w-4 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.readyOrders}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-xs font-medium">Delivered</CardTitle>
//             <Truck className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-xs font-medium">Cancelled</CardTitle>
//             <XCircle className="h-4 w-4 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.cancelledOrders}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Meal Availability Pie Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Meal Availability</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={mealStatsData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, value }) => `${name}: ${value}`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {mealStatsData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Order Status Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Status Distribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={orderStatusData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#8884d8">
//                   {orderStatusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* User Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>User Distribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={userStatsData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, value }) => `${name}: ${value}`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {userStatsData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Order Flow */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Flow</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={orderFlowData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="stage" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="count"
//                   stroke="#8b5cf6"
//                   strokeWidth={2}
//                   dot={{ fill: "#8b5cf6", r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Summary Stats */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Overall Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Success Rate</p>
//                 <p className="text-2xl font-bold">
//                   {stats.totalOrders > 0
//                     ? (
//                         (stats.deliveredOrders / stats.totalOrders) *
//                         100
//                       ).toFixed(1)
//                     : 0}
//                   %
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Clock className="h-6 w-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Active Orders</p>
//                 <p className="text-2xl font-bold">
//                   {stats.placedOrders +
//                     stats.preparingOrders +
//                     stats.readyOrders}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-red-100 rounded-lg">
//                 <TrendingDown className="h-6 w-6 text-red-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Cancellation Rate
//                 </p>
//                 <p className="text-2xl font-bold">
//                   {stats.totalOrders > 0
//                     ? (
//                         (stats.cancelledOrders / stats.totalOrders) *
//                         100
//                       ).toFixed(1)
//                     : 0}
//                   %
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from "react";

export default function StaticsPage() {
  return <div>StaticsPage</div>;
}
