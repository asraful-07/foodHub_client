"use client";

import { mealService } from "@/service/meal.service";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  MapPin,
  Clock,
  Leaf,
  Loader2,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

interface MealData {
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
  createdAt: string;
  updatedAt: string;
  provider: {
    restaurantName: string;
    address: string;
  };
  category: {
    name: string;
  };
}

interface Review {
  id: string;
  mealId: string;
  customerId: string;
  rating: number;
  comment: string | null;
  customer: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function MealDetailsClient({ data }: { data: MealData }) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab, data.id]);

  const fetchReviews = () => {
    setReviewsLoading(true);
    fetch(`https://foodhunt-eight.vercel.app/api/review?mealId=${data.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          setReviews(responseData.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews");
      })
      .finally(() => {
        setReviewsLoading(false);
      });
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://foodhunt-eight.vercel.app/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            mealId: data.id,
            quantity: quantity,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(`${data.name} added to cart`);
        setQuantity(1);
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://foodhunt-eight.vercel.app/api/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            mealId: data.id,
            rating: rating,
            comment: comment || null,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Review submitted successfully");
        setRating(0);
        setComment("");
        fetchReviews();
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    addToCart({ id: data.id, name: data.name, quantity: 1 });
  };

  const incrementQuantity = () => {
    if (quantity < data.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Side - Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={data.image[selectedImage] || data.image[0]}
                  alt={data.name}
                  fill
                  className="object-cover p-4"
                  priority
                />
                {!data.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Gallery */}
          {data.image.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {data.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-700 scale-105"
                      : "border-gray-200 hover:border-orange-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${data.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-sm">
                {data.category.name}
              </Badge>
              <Badge
                variant={
                  data.dietaryPreferences === "VEG" ? "default" : "secondary"
                }
                className="text-sm"
              >
                <Leaf className="w-3 h-3 mr-1" />
                {data.dietaryPreferences}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {data.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(Number(averageRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {averageRating} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {data.description}
            </p>
          </div>

          <div className="border-t border-b py-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-orange-700" />
              <div>
                <p className="font-semibold">{data.provider.restaurantName}</p>
                <p className="text-sm text-gray-500">{data.provider.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-orange-700" />
              <span className="text-sm">
                {data.stock > 0 ? `${data.stock} available` : "Out of stock"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-4xl font-bold text-orange-700">৳{data.price}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="text-base font-semibold">Quantity:</Label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-6 py-2 font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= data.stock}
                  className="rounded-l-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={() => {
                (handleAddToCart(), handleAdd());
              }}
              disabled={!data.isAvailable || loading || data.stock === 0}
              className="w-full bg-orange-700 hover:bg-orange-800 text-white py-6 text-lg font-semibold"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
              Halal
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              Veg
            </span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              Non-Veg
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              FAST-FOOD
            </span>
          </div>
          <div className="flex gap-4">
            <FaFacebook className="w-10 h-8 text-blue-600 hover:text-blue-800 cursor-pointer" />
            <FaTwitter className="w-10 h-8 text-blue-400 hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="w-10 h-8 text-pink-500 hover:text-pink-700 cursor-pointer" />
            <FaLinkedin className="w-10 h-8 text-blue-700 hover:text-blue-900 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardContent className="p-6">
          {/* Tab Buttons */}
          <div className="flex border-b mb-6">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "description" | "reviews")}
                className={`capitalize px-6 py-3 font-semibold border-b-2 transition-all duration-300 ${
                  activeTab === tab
                    ? "border-orange-700 text-orange-700"
                    : "border-transparent text-gray-500 hover:text-orange-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "description" ? (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">About this dish</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.description}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Category</h4>
                    <p className="text-gray-600">{data.category.name}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Dietary Preference</h4>
                    <p className="text-gray-600">{data.dietaryPreferences}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Price</h4>
                    <p className="text-gray-600">৳{data.price}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Availability</h4>
                    <p className="text-gray-600">
                      {data.isAvailable ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Review Form */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Write a Review
                    </h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Rating *</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoverRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comment" className="mb-2 block">
                          Comment (Optional)
                        </Label>
                        <Textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading || rating === 0}
                        className="bg-orange-700 hover:bg-orange-800"
                      >
                        {loading ? "Submitting..." : "Submit Review"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Reviews ({reviews.length})
                  </h3>

                  {reviewsLoading ? (
                    <div className="text-center py-8 text-gray-500">
                      Loading reviews...
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No reviews yet. Be the first to review!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold">
                                  {review.customer?.name || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {new Date(
                                      review.createdAt,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-gray-700 mt-2">
                                {review.comment}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
