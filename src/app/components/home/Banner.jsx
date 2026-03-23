// components/home/Banner.jsx   ← এই নামেই রাখো
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // Pause on interaction
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleInteraction = () => {
      stopAutoplay();
      setTimeout(startAutoplay, 10000); // restart after 10s inactivity
    };

    container.addEventListener('mouseenter', handleInteraction);
    container.addEventListener('click', handleInteraction);
    container.addEventListener('touchstart', handleInteraction);

    return () => {
      container.removeEventListener('mouseenter', handleInteraction);
      container.removeEventListener('click', handleInteraction);
      container.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div
      ref={carouselRef}
      className="carousel w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full h-full snap-start"
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-75"
              priority={slide.id === 1}
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/70 via-base-100/30 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-center px-6 md:px-12 z-10">
            <div className="max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto drop-shadow-lg">
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaLink}
                className="btn btn-primary btn-lg px-10 md:px-14 text-lg shadow-xl hover:shadow-primary/50 transition-all duration-300"
              >
                {slide.ctaText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
        <button
          onClick={() => {
            const prev = currentSlide === 1 ? slides.length : currentSlide - 1;
            goToSlide(prev);
          }}
          className="btn btn-circle btn-neutral btn-outline opacity-70 hover:opacity-100"
        >
          ❮
        </button>
        <button
          onClick={() => {
            const next = currentSlide === slides.length ? 1 : currentSlide + 1;
            goToSlide(next);
          }}
          className="btn btn-circle btn-neutral btn-outline opacity-70 hover:opacity-100"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === slide.id
                ? 'bg-primary scale-125'
                : 'bg-white/60 hover:bg-primary'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;