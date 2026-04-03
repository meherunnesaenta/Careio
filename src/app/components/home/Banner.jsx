// components/home/Banner.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: "/assets/banner/banner1.png",
    title: "Trusted Care for Your Loved Ones",
    subtitle: "Reliable babysitting, elderly support & special needs care — right at home",
    ctaText: "Book Now",
    ctaLink: "/service",
  },
  {
    id: 2,
    image: "/assets/banner/banner2.png",
    title: "Multi-Generational Family Happiness",
    subtitle: "Caring for children and seniors together — safe & joyful moments",
    ctaText: "Explore Services",
    ctaLink: "/login",
  },
  {
    id: 3,
    image: "/assets/banner/banner3.png",
    title: "Compassionate Elderly Support",
    subtitle: "Warm companionship & daily assistance for your parents & grandparents",
    ctaText: "Learn More",
    ctaLink: "/service",
  },
  {
    id: 4,
    image: "/assets/banner/banner4.png",
    title: "Loving Baby & Child Care",
    subtitle: "Professional nannies creating fun & safe playtime for your little ones",
    ctaText: "Book Baby Care",
    ctaLink: "/service",
  },
  {
    id: 5,
    image: "/assets/banner/banner5.png",
    title: "Emotional Bonding & Trust",
    subtitle: "Building strong connections through caring & attentive home services",
    ctaText: "Get Started",
    ctaLink: "/booking",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayInterval = useRef(null);
  const carouselRef = useRef(null);

  const goToSlide = (slideId) => {
    setCurrentSlide(slideId);
    const target = document.getElementById(`slide${slideId}`);
    if (target && carouselRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  const startAutoplay = () => {
    if (autoplayInterval.current) clearInterval(autoplayInterval.current);
    autoplayInterval.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev === slides.length ? 1 : prev + 1;
        goToSlide(next);
        return next;
      });
    }, 6000);
    setIsPlaying(true);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div className=" rounded-2xl overflow-hidden shadow-2xl mt-4">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => {
          stopAutoplay();
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          startAutoplay();
          setIsHovered(false);
        }}
      >
        {/* Carousel Container */}
        <div className="carousel w-full h-[70vh] md:h-[85vh] lg:h-screen relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              id={`slide${slide.id}`}
              className="carousel-item relative w-full h-full snap-start"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`relative w-full h-full transition-transform duration-[8000ms] ease-out ${
                  currentSlide === slide.id ? 'scale-110' : 'scale-100'
                }`}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={95}
                  />
                </div>
                
                {/* Modern Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                
                {/* Overlay Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-8 z-10">
                <div className={`max-w-4xl transition-all duration-700 delay-300 ${
                  currentSlide === slide.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  {/* Animated Badge */}
                  <div className="inline-block mb-4 md:mb-6 animate-slideDown">
                    <span className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/30 shadow-lg">
                      ✨ Trusted Care Since 2024
                    </span>
                  </div>

                  {/* Animated Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight animate-slideUp">
                    {slide.title}
                  </h2>

                  {/* Animated Subtitle */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-lg animate-fadeIn">
                    {slide.subtitle}
                  </p>

                  {/* Animated CTA Button */}
                  <div className="animate-scaleIn">
                    <Link
                      href={slide.ctaLink}
                      className="group relative inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold text-base md:text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">{slide.ctaText}</span>
                      <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide Number Indicator */}
              <div className="absolute bottom-6 left-6 z-20 hidden md:block">
                <div className="bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/20">
                  <span className="text-white font-semibold tracking-wide">
                    {String(slide.id).padStart(2, '0')}
                    <span className="text-white/40"> / {String(slides.length).padStart(2, '0')}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons with hover effect */}
        <div className={`absolute flex justify-between transform -translate-y-1/2 left-4 right-4 md:left-8 md:right-8 top-1/2 z-20 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'
        }`}>
          <button
            onClick={() => {
              const prev = currentSlide === 1 ? slides.length : currentSlide - 1;
              goToSlide(prev);
            }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          >
            <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => {
              const next = currentSlide === slides.length ? 1 : currentSlide + 1;
              goToSlide(next);
            }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          >
            <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator with animation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slide.id)}
              className={`transition-all duration-500 ${
                currentSlide === slide.id
                  ? 'w-10 h-2 bg-primary rounded-full shadow-lg shadow-primary/50'
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-primary/80 hover:scale-125'
              }`}
            />
          ))}
        </div>

        {/* Autoplay Control */}
        <button
          onClick={toggleAutoplay}
          className={`absolute bottom-6 right-6 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-primary transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'
          }`}
        >
          {isPlaying ? (
            <FaPause className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <FaPlay className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-[6000ms] linear"
              style={{ 
                width: isPlaying ? '100%' : '0%',
                transition: isPlaying ? 'width 6000ms linear' : 'none'
              }}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }
          
          .animate-slideDown {
            animation: slideDown 0.6s ease-out;
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out 0.2s both;
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out 0.4s both;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Banner;