import { userService } from "@/service/user.service";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Star, Shield, Calendar, Edit } from "lucide-react";
import Link from "next/link";

export default async function Profile() {
  const { data } = await userService.getSession();

  if (!data || !data.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
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
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = data.user;

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
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-4xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left flex-1 pt-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h1>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>

              {/* Edit Button - Desktop */}
              <div className="hidden sm:block">
                <span>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </span>
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
                    {user.role}
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
                    {user.status}
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
                    {user.email}
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
          <span className="w-full">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Profile
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
