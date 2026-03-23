import React from "react";

const ServiceCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-base-300 rounded-t-xl"></div>

      {/* Content */}
      <div className="card-body space-y-3">
        {/* Title + Badge */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-base-300 rounded"></div>
          <div className="h-5 w-16 bg-base-300 rounded"></div>
        </div>

        {/* Description */}
        <div className="h-4 w-full bg-base-300 rounded"></div>
        <div className="h-4 w-3/4 bg-base-300 rounded"></div>

        {/* Features */}
        <div className="space-y-2 mt-2">
          <div className="h-3 w-5/6 bg-base-300 rounded"></div>
          <div className="h-3 w-4/6 bg-base-300 rounded"></div>
          <div className="h-3 w-3/6 bg-base-300 rounded"></div>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-5 w-16 bg-base-300 rounded"></div>
          <div className="h-8 w-24 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;