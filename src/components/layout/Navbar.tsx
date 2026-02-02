"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUtensils,
  FaTachometerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { useCart } from "@/context/CartContext";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { cartItems } = useCart();

  const menuItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/about", label: "About", icon: FaInfoCircle },
    { href: "/contact", label: "Contact", icon: FaEnvelope },
    { href: "/meal", label: "Meal", icon: FaUtensils },
  ];

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <FaUtensils className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-orange-50 transition"
            >
              <FaShoppingCart className="text-xl text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}{" "}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer"
              >
                <Image
                  src="https://i.ibb.co.com/7tHkKsnF/download.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-orange-200 hover:border-orange-500 shadow-md"
                />
              </div>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-xl z-20">
                    {!isLoggedIn ? (
                      <>
                        <Link
                          href="/login"
                          className="px-4 py-3 flex items-center gap-3 hover:bg-orange-50 border-b"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaSignInAlt className="text-orange-600" />
                          Login
                        </Link>

                        <Link
                          href="/register"
                          className="px-4 py-3 flex items-center gap-3 hover:bg-orange-50"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUserPlus className="text-orange-600" />
                          Register
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className="px-4 py-3 flex items-center gap-3 hover:bg-orange-50 border-b"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaTachometerAlt className="text-orange-600" />
                          Dashboard
                        </Link>

                        <div className="hover:bg-orange-50">
                          <LogoutButton />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50"
            >
              {showMobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
