"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ShoppingCart,
  Loader2,
  CreditCard,
  Package,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

interface CartItem {
  id: string;
  mealId: string;
  quantity: number;
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
      id: string;
      restaurantName: string;
    };
  };
}

interface CartData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export default function CheckoutPage() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    setError(null);

    fetch("https://foodhunt-eight.vercel.app/api/cart", {
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (!cartData || cartData.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Get the first provider ID from cart items
    // Assuming all items are from the same provider
    const providerId = cartData.items[0]?.meal?.provider?.id;

    if (!providerId) {
      toast.error("Provider information is missing");
      return;
    }

    // Format items for the order
    const items = cartData.items.map((item) => ({
      mealId: item.mealId,
      quantity: item.quantity,
    }));

    setPlacingOrder(true);

    try {
      const response = await fetch(
        "https://foodhunt-eight.vercel.app/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            providerId: providerId,
            deliveryAddress: deliveryAddress.trim(),
            items: items,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Order placed successfully!");

        router.push("/dashboard/orders");
      } else {
        toast.error(result.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong");
    } finally {
      setPlacingOrder(false);
    }
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

  if (isEmpty) {
    router.push("/cart");
    return null;
  }

  const totalItems = cartData?.totalItems || 0;
  const totalPrice = cartData?.totalPrice || 0;
  const deliveryFee = 50;
  const serviceCharge = 20;
  const grandTotal = totalPrice + deliveryFee + serviceCharge;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => router.push("/cart")}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-700" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deliveryAddress"
                    type="text"
                    placeholder="House address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    Please enter your complete delivery address
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-700" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay when you receive your order
                    </p>
                  </div>
                  <Badge className="ml-auto bg-orange-100 text-orange-700 hover:bg-orange-100">
                    Default
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-700" />
                  Order Items ({totalItems})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.meal.image[0]}
                          alt={item.meal.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.meal.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.meal.category.name}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {item.meal.provider.restaurantName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-semibold text-orange-700">
                            ৳{(item.meal.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">
                      ৳{totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      ৳{deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span className="font-semibold">
                      ৳{serviceCharge.toFixed(2)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-700">
                      ৳{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={placingOrder || !deliveryAddress.trim()}
                  className="w-full bg-orange-700 hover:bg-orange-800 py-6 text-lg font-semibold"
                >
                  {placingOrder ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                {/* Trust Info */}
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-orange-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay when you receive
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-orange-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Fast Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Within 30-45 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-4 h-4 text-orange-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Secure Order
                      </p>
                      <p className="text-xs text-gray-500">
                        Your order is safe
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
