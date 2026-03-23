'use client';

import React from 'react';

const ServiceDetails = () => {
  // 🔥 demo data (later API থেকে আসবে)
  const service = {
    name: "Baby Sitting & Child Care",
    category: "child",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    shortDescription: "নিরাপদ ও ভালোবাসাপূর্ণ শিশু যত্ন সেবা।",
    description:
      "নবজাতক থেকে ১০ বছর বয়সী শিশুদের জন্য পেশাদার কেয়ারগিভার।",
    price: 600,
    features: [
      "প্রশিক্ষিত কেয়ারগিভার",
      "খেলাধুলা ও শেখার কার্যক্রম",
      "খাওয়ানো ও হাইজিন সহায়তা",
      "দৈনিক আপডেট",
    ],
  };

  return (
    <div className="container-custom py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* 🔹 Image Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* 🔹 Content Section */}
        <div>
          {/* Category */}
          <span className="badge badge-secondary mb-3 capitalize">
            {service.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            {service.name}
          </h1>

          {/* Short Description */}
          <p className="text-base-content/70 mb-4">
            {service.shortDescription}
          </p>

          {/* Price */}
          <p className="text-2xl font-bold text-accent mb-6">
            ৳ {service.price}
          </p>

          {/* Features */}
          <div className="bg-base-200 p-5 rounded-xl mb-6">
            <h3 className="text-lg font-semibold mb-3 text-base-content">
              Service Features
            </h3>

            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-success">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <p className="text-base-content/80 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="btn btn-primary">
              Book Now
            </button>

            <button className="btn btn-outline btn-secondary">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;