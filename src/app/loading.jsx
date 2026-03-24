'use client';

import Image from "next/image";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      
      {/* Logo */}
      <div className="animate-pulse">
        <Image
          src='/assets/logo.png'
          alt="Care.xyz"
          width={120}
          height={120}
          className="mb-4"
        />
      </div>

   
      <div className="w-48 mt-6">
        <progress className="progress progress-accent w-full"></progress>
      </div>

    </div>
  );
};

export default Loading;