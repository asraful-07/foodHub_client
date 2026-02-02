import Image from "next/image";

export default function Cooking() {
  const items = [
    {
      icon: "/images/icon1.png",
      title: "Menu Types",
      value: "200",
    },
    {
      icon: "/images/icon2.png",
      title: "Different Origin",
      value: "80",
    },
    {
      icon: "/images/icon3.png",
      title: "Pasta & Noodles",
      value: "190",
    },
    {
      icon: "/images/icon4.png",
      title: "Meals To Go",
      value: "280",
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {items.map((item, i) => (
          <div key={i} className="space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="opacity-80"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-medium text-gray-800">{item.title}</h2>

            {/* Number */}
            <p className="text-4xl font-bold text-orange-600">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
