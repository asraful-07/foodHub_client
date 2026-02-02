"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
}

export default function AddCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const playSound = () => {
    const audio = new Audio("/sounds/add-to-cart.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const addToCart = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
          unit: product.unit,
        }),
      });

      const data = await res.json();

      if (data.success) {
        playSound();

        toast.success("Added to cart 🛒", {
          description: `${product.name} has been added to your cart`,
        });

        setQuantity(1);
      } else {
        toast.error("Error", {
          description: data.message || "Failed to add to cart",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to add to cart",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Quantity controller */}
      <div className="flex items-center gap-2 border rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-8 text-center font-medium">{quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-2 hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={addToCart}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span> Adding...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </span>
        )}
      </Button>
    </div>
  );
}
