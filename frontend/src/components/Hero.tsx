'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroBlock, HeroSlide } from '@/lib/types';
import { getMediaUrl, getMediaAlt } from '@/lib/image';

type HeroProps = {
  data: HeroBlock;
};

export default function Hero({ data }: HeroProps) {
  console.log('Hero data:', data);

  // Normalize data to array (before hooks)
  const slides: HeroSlide[] = data ? (Array.isArray(data) ? data : [data]) : [];

  // All hooks must be called BEFORE any early returns
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext, slides.length]);

  // Now safe to do early return - after all hooks
  if (!data || slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];
  const mediaUrl = getMediaUrl(currentSlide.media);

  const handleSlideClick = () => {
    if (currentSlide.linkUrl) {
      window.location.href = currentSlide.linkUrl;
    }
  };

  return (
    <section
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const slideMediaUrl = getMediaUrl(slide.media);
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div
                className={`relative h-full w-full ${slide.linkUrl ? 'cursor-pointer' : ''}`}
                onClick={() => slide.linkUrl && (window.location.href = slide.linkUrl)}
                role={slide.linkUrl ? 'button' : undefined}
                tabIndex={slide.linkUrl ? 0 : undefined}
              >
                {slideMediaUrl ? (
                  <Image
                    src={slideMediaUrl}
                    alt={getMediaAlt(slide.media, slide.headline)}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <p className="text-xl font-semibold text-primary-700">Hình ảnh Trường THCS Xuân Cao</p>
                  </div>
                )}
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Text Content Overlay - Bottom Left */}
      <div className="relative z-20 h-full">
        <div className="container h-full flex items-end pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-2xl space-y-3 md:space-y-4">
            {/* Animated text content */}
            <div
              key={currentIndex}
              className="animate-fade-in-up"
            >
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white border border-white/30">
                Ngôi trường hạnh phúc
              </span>
              <h1 className="mt-3 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                {currentSlide.headline}
              </h1>
              {currentSlide.subheadline && (
                <p className="mt-2 text-sm md:text-base lg:text-lg text-white/90 drop-shadow">
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {currentSlide.primaryCta && (
                  <Link
                    href={currentSlide.primaryCta.url}
                    className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-700 hover:scale-105"
                  >
                    {currentSlide.primaryCta.label}
                  </Link>
                )}
                {currentSlide.secondaryCta && (
                  <Link
                    href={currentSlide.secondaryCta.url}
                    className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30"
                  >
                    {currentSlide.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 backdrop-blur-sm p-2.5 shadow-lg transition hover:bg-white/20 hover:scale-110 border border-white/20"
            aria-label="Slide trước"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 backdrop-blur-sm p-2.5 shadow-lg transition hover:bg-white/20 hover:scale-110 border border-white/20"
            aria-label="Slide tiếp theo"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-1.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Đi tới slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
