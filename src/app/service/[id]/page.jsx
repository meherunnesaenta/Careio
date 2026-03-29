import { getSingleService } from '@/actions/server/service';
import BookNow from '@/app/components/Button/BookNow';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Dynamic metadata (recommended)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getSingleService(resolvedParams.id); 

  return {
    title: `${service?.name || "Service"} - Care Bangladesh`,
    description: service?.description 
      ? service.description.substring(0, 160) 
      : "Book professional home care service with trusted caregivers.",
    openGraph: {
      title: service?.name || "Service Details",
      description: service?.description || "",
      images: [{ url: service?.image || "https://i.ibb.co/hJPcXLsq/image.png" }],
    },
  };
}

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);


  if (!service) {
    return {
      title: "Service Not Found",
    };
  }
  return (
    <div className="container-custom py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* 🔹 Image Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={service.image}
            alt={service.name}
            width={800}
            height={350}
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
            <BookNow service={{...service, id: service._id }}></BookNow>

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
