'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Animated Logo Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-50 animate-pulse"></div>
          
          {/* Logo with Rotating Border */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur-md animate-spin-slow"></div>
            <div className="relative bg-base-100 rounded-full p-4">
              <div className="animate-bounce-slow">
                <Image
                  src='/assets/logo.png'
                  alt="Care.io"
                  width={100}
                  height={100}
                  className="relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name with Gradient */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
            Care.io
          </h1>
          <p className="text-base-content/60 mt-2 text-sm animate-pulse">
            Loading amazing experiences...
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-64 md:w-80 mt-8">
          <div className="relative">
            <div className="h-1 bg-base-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Progress Percentage */}
            <div className="absolute -top-6 right-0 text-xs font-semibold text-primary">
              {progress}%
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Loading Text */}
        <div className="mt-4 text-xs text-base-content/40 font-mono">
          <span className="animate-pulse">●</span> Loading assets 
          <span className="animate-pulse">●</span> Preparing care 
          <span className="animate-pulse">●</span> Almost ready
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default Loading;