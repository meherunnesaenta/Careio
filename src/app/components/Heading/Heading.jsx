'use client';

import React from 'react';

const Heading = ({ children, center = true, subText }) => {
  return (
    <div className={`mb-6 ${center ? "text-center" : "text-left"}`}>
      {/* Main Heading */}
      <h2
        className="
          text-3xl md:text-4xl font-semibold
          text-primary
          relative inline-block
        "
      >
        {children}

        {/* Accent underline */}
        <span className="block w-8 mx-auto h-1 bg-secondary mt-2 rounded"></span>
      </h2>

      {/* Optional Subtext */}
      {subText && (
        <p className="text-base-content/70 mt-2 max-w-xl">
          {subText}
        </p>
      )}
    </div>
  );
};

export default Heading;