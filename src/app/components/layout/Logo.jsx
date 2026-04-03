'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={'/'} 
      className='flex items-center gap-2 group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Image Container with pulse effect */}
      <div className="relative">
        <div className={`
          absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary 
          transition-all duration-500 ease-out
          ${isHovered ? 'scale-150 opacity-20 blur-md' : 'scale-100 opacity-0'}
        `}></div>
        
        <Image
          src='/assets/logo.png'
          alt="Care.io - Your Trusted Service Platform"
          width={80}
          height={80}
          className="w-11 h-auto md:w-13 relative z-10 transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>

      {/* Animated Text */}
      <div className="relative overflow-hidden">
        <div className="flex items-baseline">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Care
            </span>
            <span className="text-accent">.</span>
            <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              io
            </span>
          </span>
        </div>
        
        {/* Animated underline on hover */}
        <div className={`
          absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary
          transition-all duration-300 ease-out
          ${isHovered ? 'w-full' : 'w-0'}
        `}></div>
      </div>

      {/* Add gradient animation to global CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </Link>
  );
};

export default Logo;