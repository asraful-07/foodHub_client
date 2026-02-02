"use client";

import React, { useState, useEffect } from "react";
import MealsCard from "@/components/modules/home/MealsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { Meal } from "@/types";

export default function MealPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceOrder, setPriceOrder] = useState("none");
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch meals and categories on mount
  useEffect(() => {
    fetchCategories();
    fetchMeals();
  }, []);

  // Re-apply filters whenever meals or filter states change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals, searchQuery, priceOrder, selectedCategories]);

  // Fetch meals from backend
  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params based on filters
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategories.length > 0)
        params.append("cuisine", selectedCategories.join(","));
      if (priceOrder !== "none") {
        params.append("sortBy", "price");
        params.append("sortOrder", priceOrder);
      }

      const response = await fetch(
        `http://localhost:5001/api/meals?${params.toString()}`,
        { credentials: "include" },
      );

      if (!response.ok) throw new Error("Failed to fetch meals");

      const result = await response.json();
      setMeals(result.data || []);
      setFilteredMeals(result.data || []);
    } catch (err) {
      // setError(err.message);
      toast.error("Failed to load meals");
      console.error("Error fetching meals:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/categories", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Apply filters locally (optional if API filters used)
  const applyFilters = () => {
    let filtered = [...meals];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (meal) =>
          meal.name &&
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((meal) =>
        selectedCategories.includes(meal.category?.name),
      );
    }

    if (priceOrder === "asc") filtered.sort((a, b) => a.price - b.price);
    else if (priceOrder === "desc") filtered.sort((a, b) => b.price - a.price);

    setFilteredMeals(filtered);
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceOrder("none");
    setSelectedCategories([]);
  };

  const hasActiveFilters =
    searchQuery || priceOrder !== "none" || selectedCategories.length > 0;

  // Filter Sidebar
  const FilterSidebar = () => (
    <Card className="border-orange-200 shadow-md sticky top-4">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-orange-800 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-gray-700 font-medium">
            Search Meals
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Price Sorting */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Sort by Price</Label>
          <RadioGroup value={priceOrder} onValueChange={setPriceOrder}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="cursor-pointer font-normal">
                Default
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asc" id="asc" />
              <Label htmlFor="asc" className="cursor-pointer font-normal">
                Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="desc" id="desc" />
              <Label htmlFor="desc" className="cursor-pointer font-normal">
                High to Low
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Cuisine Category</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center space-x-2">
                <Checkbox
                  id={cat.name}
                  checked={selectedCategories.includes(cat.name)}
                  onCheckedChange={() => handleCategoryToggle(cat.name)}
                  className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label
                  htmlFor={cat.name}
                  className="cursor-pointer font-normal text-gray-700"
                >
                  {cat.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Meals</h1>
          <p className="text-gray-600">
            Discover delicious meals from our menu
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-1 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <FilterSidebar />
          </div>

          {/* Meals Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredMeals.length}{" "}
                {filteredMeals.length === 1 ? "meal" : "meals"} found
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <X className="w-4 h-4 mr-1" /> Clear Filters
                </Button>
              )}
            </div>

            {filteredMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeals.map((meal: Meal) => (
                  <MealsCard key={meal.id} meal={meal} />
                ))}
              </div>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="py-12 text-center">
                  <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No meals found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {hasActiveFilters
                      ? "Try adjusting your filters"
                      : "No meals available at the moment"}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
