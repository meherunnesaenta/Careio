'use client';

import Image from "next/image";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      
      {/* Logo */}
      <div className="animate-pulse">
        <Image
          src='/assets/logo.jpg'
          alt="Care.xyz"
          width={120}
          height={120}
          className="mb-4"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-primary mb-2">
        Care.xyz
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-base-content/60 mb-6">
        Trusted Care Services
      </p>

      {/* Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-accent"></span>

      {/* Optional Progress Bar */}
      <div className="w-48 mt-6">
        <progress className="progress progress-accent w-full"></progress>
      </div>

    </div>
  );
};

export default Loading;