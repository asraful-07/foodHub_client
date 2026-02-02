import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingCart,
  FaCalendarAlt,
  FaUtensils,
  FaHeart,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="py-16 mt-16 text-white bg-gradient-to-b from-gray-900 to-[#090614]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Grid Section */}
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 mb-10">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <FaUtensils className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  FoodHub
                </span>
              </Link>
            </div>
            <p className="mt-2 text-gray-300">
              Your premier destination for culinary delights. We offer a diverse
              collection of recipes, cooking tips, and food products from around
              the world. Discover your next favorite meal with us.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-orange-500 to-red-500 transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-orange-500 to-red-500 transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-orange-500 to-red-500 transition-all"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-orange-500 to-red-500 transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Food Categories */}
          <div>
            <h6 className="text-lg font-semibold mb-4 flex items-center">
              <FaUtensils className="mr-2 bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded" />
              Food Categories
            </h6>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Italian Cuisine
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Asian Delights
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Healthy & Organic
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Desserts & Bakery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Vegan Specialties
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-lg font-semibold mb-4 flex items-center">
              <FaShoppingCart className="mr-2 bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded" />
              Our Services
            </h6>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Online Food Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Recipe Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Cooking Classes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Meal Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-white flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  Corporate Catering
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="text-lg font-semibold mb-4 flex items-center">
              <FaHeart className="mr-2 bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded" />
              Contact Us
            </h6>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0 text-orange-400" />
                <span>123 Food Street, Culinary District, FK 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-orange-400" />
                <a
                  href="tel:+11234567890"
                  className="hover:underline hover:text-white"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-orange-400" />
                <a
                  href="mailto:info@foodhub.com"
                  className="hover:underline hover:text-white"
                >
                  info@foodhub.com
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-orange-400" />
                  <h6 className="font-medium text-white">Opening Hours</h6>
                </div>
                <div className="ml-6">
                  <p>Mon-Fri: 8am - 10pm</p>
                  <p>Sat-Sun: 9am - 11pm</p>
                  <p className="text-xs mt-1 text-orange-300">
                    *Extended hours during weekends
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col lg:flex-row justify-between items-center text-gray-400 text-sm">
          <p className="text-center lg:text-left w-full">
            &copy; {new Date().getFullYear()} FoodHub. All rights reserved. |
            <a href="#" className="hover:underline hover:text-white ml-1">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:underline hover:text-white ml-1">
              Terms of Service
            </a>
          </p>

          <div className="flex items-center mt-4 lg:mt-0">
            <span className="mr-2">We Deliver With:</span>
            <div className="p-1 bg-white rounded shadow-md w-60 md:w-96 h-auto">
              <img
                src="https://i.ibb.co/QFNjq6Qs/footer.png"
                alt="Delivery Partners"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
