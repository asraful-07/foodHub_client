export interface Meal {
  id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  isAvailable: boolean;
  stock: number;
  dietaryPreferences: string;
  provider: {
    restaurantName: string;
    address: string;
  };
  category: {
    name: string;
  };
}
