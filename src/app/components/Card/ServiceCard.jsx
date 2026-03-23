import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }) => {
  const {
    _id,
    name,
    category,
    image,
    shortDescription,
    price,
    features,
  } = service;

  return (
    <div className="card bg-base-100 shadow-xl">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body">
        {/* Title + Category */}
        <div className="flex justify-between items-center">
          <h2 className="card-title text-primary">{name}</h2>
          <span className="badge badge-secondary capitalize">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70">
          {shortDescription}
        </p>

        {/* Features */}
        <ul className="mt-2 space-y-1">
          {features?.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm flex items-center gap-2">
              ✅ {feature}
            </li>
          ))}
        </ul>

        {/* Price + Button */}
        <div className="card-actions justify-between items-center mt-4">
          <p className="text-lg font-bold text-accent">
            ৳ {price}
          </p>
          <Link href={`/service/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;