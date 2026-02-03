import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "My Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
      // {
      //   title: "Cart",
      //   url: "/dashboard/cart",
      // },
      // {
      //   title: "Checkout",
      //   url: "/dashboard/checkout",
      // },
      {
        title: "Orders history",
        url: "/dashboard/orders",
      },
      {
        title: "Request",
        url: "/dashboard/add",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
