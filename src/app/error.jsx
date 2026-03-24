'use client';

import Image from "next/image";
import Link from "next/link";

const ErrorPage = ({ error, reset }) => {
  console.error(error); // console log for dev

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 text-center">
      
      {/* Logo */}
      <Image
        src="/assets/logo.png" // ✅ public folder path
        alt="Care.xyz Logo"
        width={120}
        height={120}
        className="mb-4 animate-pulse"
      />

      {/* Error Title */}
      <h1 className="text-4xl font-bold text-error mb-2">
        Something went wrong
      </h1>

      {/* Error Message */}
      <p className="text-base-content/60 mb-6 max-w-md">
        {error?.message || "An unexpected error occurred. Don't worry, care is just a click away 💙"}
      </p>

      {/* Reset Button */}
      <button
        className="btn btn-accent px-6 mb-3"
        onClick={() => reset()}
      >
        🔄 Try Again
      </button>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="btn btn-primary px-6">
          ⬅ Back to Home
        </button>
      </Link>

      {/* Optional Support Text */}
      <p className="mt-6 text-sm text-base-content/40">
        Need help? Contact our support anytime.
      </p>

    </div>
  );
};

export default ErrorPage;