"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Trash2,
  ShoppingCart,
  Minus,
  Plus,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react";

interface CartItem {
  id: string;
  mealId: string;
  quantity: number;
  createdAt: string;
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: {
      name: string;
    };
    provider: {
      restaurantName: string;
    };
  };
}

interface CartData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export default function AddCartPage() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [clearingCart, setClearingCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5001/api/cart", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartData(data.data);
        } else {
          setError(data.message || "Failed to fetch cart");
        }
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError("Something went wrong");
        toast.error("Failed to load cart");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteItem = async (itemId: string) => {
    setDeletingItemId(itemId);

    try {
      const response = await fetch(
        `http://localhost:5001/api/cart/item/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Item removed from cart");
        fetchCart(); // Refresh cart data
      } else {
        toast.error(result.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

    setClearingCart(true);

    try {
      const response = await fetch("http://localhost:5001/api/cart/clear", {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Cart cleared successfully");
        fetchCart();
      } else {
        toast.error(result.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Something went wrong");
    } finally {
      setClearingCart(false);
    }
  };

  const handleCheckout = () => {
    if (!cartData || cartData.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Redirect to checkout page
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-orange-700 mb-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
            <Button onClick={fetchCart} variant="outline" className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isEmpty = !cartData || !cartData.items || cartData.items.length === 0;
  const totalItems = cartData?.totalItems || 0;
  const totalPrice = cartData?.totalPrice || 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {isEmpty
            ? "Your cart is empty"
            : `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`}
        </p>
      </div>

      {isEmpty ? (
        <Card>
          <CardContent className="p-16 text-center">
            <div className="flex flex-col items-center justify-center">
              <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add some delicious meals to get started!
              </p>
              <Button
                onClick={() => router.push("/meal")}
                className="bg-orange-700 hover:bg-orange-800"
              >
                Browse Meals
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleClearCart}
                disabled={clearingCart}
                variant="outline"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                {clearingCart ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </>
                )}
              </Button>
            </div>

            {/* Cart Items List */}
            {cartData.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.meal.image[0]}
                        alt={item.meal.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {item.meal.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.meal.category.name}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {item.meal.provider.restaurantName}
                            </span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          disabled={deletingItemId === item.id}
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          {deletingItemId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.meal.description}
                      </p>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Quantity:
                          </span>
                          <span className="font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            ৳{item.meal.price} each
                          </p>
                          <p className="text-lg font-bold text-orange-700">
                            ৳{(item.meal.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">$60.00</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span className="font-semibold">$20.00</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-700">
                      ${(totalPrice + 50 + 20).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-orange-700 hover:bg-orange-800 py-6 text-lg font-semibold"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  onClick={() => router.push("/meal")}
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>

                {/* Trust Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShoppingCart className="w-4 h-4 text-orange-700" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShoppingCart className="w-4 h-4 text-orange-700" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
