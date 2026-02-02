import React from "react";
import Image from "next/image";

const popularItems = [
  { id: 1, name: "Indian Curry", image: "/images/festive-1.png" },
  { id: 2, name: "Grilled Chicken", image: "/images/festive-2.png" },
  { id: 3, name: "Stuffed Eggplant", image: "/images/festive-3.png" },
  { id: 4, name: "BBQ Skewers", image: "/images/festive-4.png" },
  { id: 5, name: "Asian Bowl", image: "/images/festive-5.png" },
];

export default function Popular() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Collection
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Lectus Proin Nibh Nisl Condimentum Id Venenatis A Condimentum Vitae.
            Pellentesque Nec Nam Aliquam Sem Et Tortor.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[4/5]"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                </div>
              </div>

              {/* Subtle border effect on hover */}
              <div className="absolute inset-0 border-4 border-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
