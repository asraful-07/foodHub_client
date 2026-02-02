"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Mail,
  Star,
  Shield,
  Calendar,
  Edit,
  User,
  Camera,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

// Define user data interface
interface UserData {
  name: string;
  email: string;
  image: string;
  role: string;
  status: string;
}

// Define form data interface
interface FormData {
  name: string;
  email: string;
  image: string;
  role: string;
  status: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    image: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/session", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const result = await response.json();
      const user: UserData = result.data.user;

      setUserData(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        role: user.role || "",
        status: user.status || "",
      });
    } catch (error) {
      toast.error("Failed to load profile data");
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenEditModal = (): void => {
    // Reset form data to current user data when opening modal
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        image: userData.image || "",
        role: userData.role || "",
        status: userData.status || "",
      });
    }
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = (): void => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      setUpdating(true);

      // Add your API call here to update the profile
      // const response = await fetch("http://localhost:5001/api/users/update", {
      //   method: "PUT",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     image: formData.image,
      //   }),
      // });

      // if (!response.ok) throw new Error("Failed to update profile");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update local state with new data
      setUserData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          name: formData.name,
          email: formData.email,
          image: formData.image,
        };
      });

      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6 text-center">
            <div className="mb-4">
              <Shield className="w-16 h-16 mx-auto text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to view your profile
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <Card className="border-none shadow-2xl mb-8 overflow-hidden">
          {/* Background Banner */}
          <div className="h-32 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <CardContent className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-4 ring-orange-100">
                <AvatarImage src={userData.image} alt={userData.name} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-4xl font-bold">
                  {userData.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left flex-1 pt-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {userData.name}
                </h1>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </p>
              </div>

              {/* Edit Button - Desktop */}
              <div className="hidden sm:block">
                <Button
                  onClick={handleOpenEditModal}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Account Details Card */}
          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Details
              </h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Role */}
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="p-2 bg-orange-200 rounded-lg">
                  <Star className="w-5 h-5 text-orange-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">Role</p>
                  <p className="text-lg text-gray-900 font-semibold capitalize">
                    {userData.role}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="p-2 bg-green-200 rounded-lg">
                  <Shield className="w-5 h-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">Status</p>
                  <p className="text-lg text-gray-900 font-semibold capitalize">
                    {userData.status}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">
                    Email Address
                  </p>
                  <p className="text-lg text-gray-900 font-semibold break-all">
                    {userData.email}
                  </p>
                </div>
              </div>

              {/* Account Created */}
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">
                    Member Since
                  </p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Button - Mobile */}
        <div className="sm:hidden flex justify-center">
          <Button
            onClick={handleOpenEditModal}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Edit className="w-6 h-6 text-orange-600" />
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Update your personal information below
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-orange-100 shadow-lg">
                  <AvatarImage src={formData.image} alt={formData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-3xl font-bold">
                    {formData.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-colors duration-200"
                  onClick={() =>
                    toast.info("Image upload feature coming soon!")
                  }
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Personal Information
              </h3>

              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="modal-name"
                  className="text-gray-700 font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="modal-email"
                  className="text-gray-700 font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Image URL Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="modal-image"
                  className="text-gray-700 font-medium"
                >
                  Profile Image URL
                </Label>
                <Input
                  id="modal-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Account Information (Read-only) */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                Account Information
                <span className="text-xs text-gray-500 font-normal ml-2">
                  (Read-only)
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Role Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="modal-role"
                    className="text-gray-700 font-medium"
                  >
                    Role
                  </Label>
                  <Input
                    id="modal-role"
                    name="role"
                    value={formData.role}
                    disabled
                    className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="modal-status"
                    className="text-gray-700 font-medium"
                  >
                    Status
                  </Label>
                  <Input
                    id="modal-status"
                    name="status"
                    value={formData.status}
                    disabled
                    className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseEditModal}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
                disabled={updating}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
