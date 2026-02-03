import Image from "next/image";
import React from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaStar,
  FaAward,
} from "react-icons/fa";

export default function AboutCard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-500">Our Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're redefining the food industry with passion, innovation, and
            excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Title & Description */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                  Since 2015
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Creating <span className="text-orange-500">Delicious</span>{" "}
                Experiences
                <br />
                That Bring People Together
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                At FoodieHub, we believe great food has the power to bring
                people together. Our journey began with a simple mission: to
                connect amazing restaurants with food lovers who crave
                exceptional dining experiences.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we serve thousands of customers daily, partnering with
                the finest restaurants to deliver not just meals, but memorable
                moments right to your doorstep.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  50K+
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
                <FaUsers className="mx-auto mt-2 text-gray-400" />
              </div>

              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-600">Restaurants</div>
                <FaStar className="mx-auto mt-2 text-gray-400" />
              </div>

              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  10K+
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
                <FaCheckCircle className="mx-auto mt-2 text-gray-400" />
              </div>

              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support</div>
                <FaAward className="mx-auto mt-2 text-gray-400" />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Why Choose Us?
              </h3>
              <div className="space-y-3">
                {[
                  "Premium restaurant partnerships",
                  "Real-time order tracking",
                  "Secure payment options",
                  "Eco-friendly packaging",
                  "24/7 customer support",
                  "Exclusive member rewards",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <FaCheckCircle className="w-3 h-3 text-orange-500" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orange Button */}
            <div className="pt-8">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3">
                <span className="text-lg">Explore Our Story</span>
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-400 rounded-full opacity-50 group-hover:w-32 transition-all duration-300"></div>
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Join over 50,000 satisfied customers
              </p>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="relative">
            {/* Main Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                <Image
                  src="/images/man1.jpg"
                  alt="Our Chef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Master Chef</p>
                  <p className="text-sm opacity-90">John Anderson</p>
                </div>
              </div>

              {/* Top Right Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                <Image
                  src="/images/man2.jpg"
                  alt="Our Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Delivery Expert</p>
                  <p className="text-sm opacity-90">Mike Chen</p>
                </div>
              </div>

              {/* Bottom Left Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300 mt-8">
                <Image
                  src="/images/man3.jpg"
                  alt="Quality Check"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Quality Manager</p>
                  <p className="text-sm opacity-90">Sarah Johnson</p>
                </div>
              </div>

              {/* Decorative Element - Bottom Right */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-orange-400 to-orange-500 mt-8 flex flex-col items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold mb-4">8+</div>
                  <div className="text-xl font-semibold mb-2">Years of</div>
                  <div className="text-lg">Excellence</div>
                  <div className="w-16 h-1 bg-white/50 rounded-full mx-auto mt-4"></div>
                  <p className="text-sm mt-4 opacity-90">
                    Serving with passion and dedication
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-2xl p-4 transform rotate-3">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaStar className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Pattern Dots */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-24 bg-gradient-to-r from-orange-50 to-white rounded-3xl p-8 md:p-12 border border-orange-100">
          <div className="max-w-3xl mx-auto text-center">
            <FaStar className="w-8 h-8 text-orange-400 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              "The team at FoodieHub transformed our restaurant's online
              presence. Our orders increased by 300% in just 3 months!"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full"></div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Robert Martinez</p>
                <p className="text-gray-600">Owner, La Bella Vista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
