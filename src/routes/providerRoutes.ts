import { Route } from "@/types";

export const providerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/provider-dashboard/dashboard",
      },
    ],
  },
  {
    title: "Menu Management",
    items: [
      {
        title: "Add Meal",
        url: "/provider-dashboard/add-meal",
      },
      {
        title: "My Meals",
        url: "/provider-dashboard/my-meal",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "Manage Orders",
        url: "/provider-dashboard/orders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
