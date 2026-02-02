export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: number;
  deliveryAddress: string;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  provider: {
    restaurantName: string;
  };
  customer: {
    name: string;
    email: string;
  };
  items: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  meal: {
    name: string;
    price: number;
  };
}
