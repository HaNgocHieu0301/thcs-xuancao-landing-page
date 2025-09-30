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
  if (!data) {
    return null;
  }

  // Normalize data to array
  const slides: HeroSlide[] = Array.isArray(data) ? data : [data];

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

  const currentSlide = slides[currentIndex];
  const mediaUrl = getMediaUrl(currentSlide.media);

  const handleSlideClick = () => {
    if (currentSlide.linkUrl) {
      window.location.href = currentSlide.linkUrl;
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            Ngôi trường hạnh phúc
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {currentSlide.headline}
          </h1>
          {currentSlide.subheadline && (
            <p className="text-lg text-slate-600">{currentSlide.subheadline}</p>
          )}
          <div className="flex flex-wrap gap-4">
            {currentSlide.primaryCta && (
              <Link
                href={currentSlide.primaryCta.url}
                className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 transition hover:bg-primary-700"
              >
                {currentSlide.primaryCta.label}
              </Link>
            )}
            {currentSlide.secondaryCta && (
              <Link
                href={currentSlide.secondaryCta.url}
                className="rounded-full border border-primary-600 px-6 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                {currentSlide.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="relative">
          <div
            className={`relative ${currentSlide.linkUrl ? 'cursor-pointer' : ''}`}
            onClick={handleSlideClick}
            role={currentSlide.linkUrl ? 'button' : undefined}
            tabIndex={currentSlide.linkUrl ? 0 : undefined}
          >
            {mediaUrl ? (
              <Image
                src={mediaUrl}
                alt={getMediaAlt(currentSlide.media, currentSlide.headline)}
                width={640}
                height={640}
                className="w-full rounded-3xl object-cover shadow-xl transition-opacity duration-500"
                priority
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl bg-primary-100 text-primary-700">
                <p className="text-lg font-semibold">Hình ảnh Trường THCS Xuân Cao</p>
              </div>
            )}
          </div>

          {/* Navigation Controls - Only show if multiple slides */}
          {slides.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white hover:scale-110"
                aria-label="Slide trước"
              >
                <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white hover:scale-110"
                aria-label="Slide tiếp theo"
              >
                <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-primary-600'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Đi tới slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
