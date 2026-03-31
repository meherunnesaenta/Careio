import React from 'react';
import Heading from '@/app/components/Heading/Heading';
import Service from '@/app/components/Service/Service';
export const metadata = {
  title: "Our Services - Care Bangladesh",
  description: "Explore all home care services: Elderly Care, Nursing, Patient Care, Housekeeping, and more. Book now!",
  keywords: ["elderly care", "nursing", "patient care", "home services", "caregiver Bangladesh"],
  openGraph: {
    title: "Browse Professional Care Services",
    description: "Find the right care service for your loved ones.",
    images: [{ url: "https://i.ibb.co/n81DtD36/image.png" }],
  },
};

const ServicePage = () => {
  return (
    <div className="">
      <Heading  >Our Services</Heading>
      <Service />
    </div>
  );
};

export default ServicePage;