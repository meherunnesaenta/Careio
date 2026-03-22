'use client';

import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
      
      {/* Logo */}
      <Image
        src="../../assets/logo.jpg"
        alt="Care.xyz"
        width={100}
        height={100}
        className="mb-4"
      />

      {/* 404 Text */}
      <h1 className="text-5xl font-bold text-primary mb-2">
        404
      </h1>

      {/* Message */}
      <h2 className="text-xl font-semibold text-base-content mb-2">
        Oops! Page not found
      </h2>

      <p className="text-base-content/60 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.  
        But don’t worry, care is just a click away 💙
      </p>

      {/* Button */}
      <Link href="/">
        <button className="btn btn-accent px-6">
          ⬅ Back to Home
        </button>
      </Link>

      {/* Extra */}
      <p className="mt-6 text-sm text-base-content/40">
        Need help? Contact our support anytime.
      </p>

    </div>
  );
};

export default NotFound;