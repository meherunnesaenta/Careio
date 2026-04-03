'use client';

import React from 'react';

const Heading = ({ 
  children, 
  center = true, 
  subText,
  badge,
  className = ''
}) => {
  return (
    <div className={`${center ? 'text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}>
      {/* Optional Badge */}
      {badge && (
        <div className={`inline-block mb-4 ${center ? 'mx-auto' : ''}`}>
          <span className="px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary rounded-full">
            {badge}
          </span>
        </div>
      )}
      
      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
        {children}
      </h2>
      
      {/* Underline */}
      <div className={`w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full ${center ? 'mx-auto' : ''} mb-6`}></div>
      
      {/* Subtext */}
      {subText && (
        <p className={`text-base-content/70 max-w-2xl text-lg ${center ? 'mx-auto' : ''}`}>
          {subText}
        </p>
      )}
    </div>
  );
};

export default Heading;