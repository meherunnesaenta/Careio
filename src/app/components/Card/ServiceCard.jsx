import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

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
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      
      {/* Image Section */}
      <figure className="h-52 overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-secondary capitalize text-white px-3 py-2">
            {category}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-lg shadow-lg">
            <p className="text-primary-content font-bold text-lg">
              ৳ {price}
            </p>
          </div>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body p-5">
        {/* Title */}
        <h2 className="card-title text-primary text-xl line-clamp-1">
          {name}
        </h2>
        
        {/* Description */}
        <p className="text-base-content/70 text-sm line-clamp-2 mb-2">
          {shortDescription}
        </p>
        
        {/* Features */}
        <div className="space-y-1.5 mt-2">
          {features?.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-base-content/80">
              <FaCheckCircle className="text-success w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
          {features?.length > 2 && (
            <div className="text-sm text-primary font-medium mt-1">
              +{features.length } more features
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="divider my-3"></div>
        
        {/* Action Button */}
        <div className="card-actions">
          <Link
            href={`/service/${_id}`}
            className="btn btn-primary w-full group/btn"
          >
            <span>View Details</span>
            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;