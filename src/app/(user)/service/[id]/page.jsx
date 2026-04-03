import { getSingleService } from '@/actions/server/service';
import BookNow from '@/app/components/Button/BookNow';
import Pay from '@/app/components/Button/Pay';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle, FaArrowLeft, FaShare, FaHeart, FaPhoneAlt, FaEnvelope, FaStar, FaShieldAlt, FaUserCheck } from 'react-icons/fa';

// Dynamic metadata
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Service Not Found</h1>
          <p className="text-base-content/70 mb-6">The service you're looking for doesn't exist.</p>
          <Link href="/service" className="btn btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Breadcrumb */}


      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Section */}
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <figure className="relative h-[400px]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-secondary text-white px-4 py-3">
                    {service.category}
                  </span>
                </div>
                {/* Share Button */}
                <button className="absolute top-4 right-4 btn btn-circle btn-ghost bg-black/50 text-white hover:bg-primary">
                  <FaShare />
                </button>
              </figure>
            </div>

            {/* Service Details Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Title and Favorite Button */}
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl md:text-4xl font-bold text-base-content">
                    {service.name}
                  </h1>
                  <button className="btn btn-circle btn-ghost hover:bg-error/10 hover:text-error">
                    <FaHeart />
                  </button>
                </div>

                {/* Category Badge */}
                <div>
                  <span className="badge badge-secondary">
                    {service.category}
                  </span>
                </div>

                {/* Short Description Highlight */}
                <div className="alert bg-primary/10 border-l-4 border-primary rounded-xl mt-2">
                  <p className="text-base-content/80">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-2">
                  <p className="text-3xl font-bold text-accent">
                    ৳ {service.price}
                  </p>
                  <p className="text-sm text-base-content/60">per session</p>
                </div>

                {/* Features Section */}
                <div className="bg-base-200 rounded-xl p-5 mt-2">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    Service Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-success w-4 h-4" />
                        <span className="text-sm text-base-content/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div className="mt-2">
                  <h3 className="text-lg font-bold mb-3">Description</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="card bg-base-100 shadow-xl mt-6">
                  <div className="card-body text-center">
                    <h4 className="font-bold mb-2">Why Choose Us?</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <FaShieldAlt className="w-6 h-6 text-primary mx-auto mb-1" />
                        <p className="text-xs text-base-content/70">Secure</p>
                      </div>
                      <div>
                        <FaUserCheck className="w-6 h-6 text-primary mx-auto mb-1" />
                        <p className="text-xs text-base-content/70">Verified</p>
                      </div>
                      <div>
                        <FaStar className="w-6 h-6 text-primary mx-auto mb-1" />
                        <p className="text-xs text-base-content/70">Trusted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                {/* Price Summary */}
                <div className="text-center pb-4 border-b border-base-300">
                  <div className="text-4xl font-bold text-primary">
                    ৳ {service.price}
                  </div>
                  <p className="text-sm text-base-content/60 mt-1">per session</p>
                </div>

                {/* Action Buttons */}
                <div className=" flex justify-center items-center gap-5 mt-2">
                  <BookNow service={{ ...service, id: service._id }} />
                </div>

                {/* Contact Support */}
                <div className="pt-4 border-t border-base-300 text-center">
                  <p className="text-xs text-base-content/60 mb-2">Need help?</p>
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-circle btn-sm btn-ghost hover:bg-primary/10 hover:text-primary">
                      <FaPhoneAlt />
                    </button>
                    <button className="btn btn-circle btn-sm btn-ghost hover:bg-primary/10 hover:text-primary">
                      <FaEnvelope />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;