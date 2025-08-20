'use client'

import { contactInfo } from '@/constants/contactInfo';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {

  const heroImages = [
    '/images/garage/hero-image-6.jpg',
    '/images/garage/hero-image-2.jpg',
    '/images/garage/hero-image-1.jpg',
    '/images/garage/hero-image-3.jpg',
    '/images/garage/hero-image-4.jpg',
    '/images/garage/hero-image-5.jpg',
    '/images/garage/hero-image-7.jpg',
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  return (
    <section className="relative overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full h-[750px]">
        <Image
          src={heroImages[currentImageIndex]}
          alt="Mert Auto Servis"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Circular Info Overlay */}
      <div className="absolute right-1 bottom-1 md:right-8 md:bottom-8 transform bg-gray-500 bg-opacity-90 text-white rounded-full w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-64 lg:h-64 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-xs sm:text-sm font-bold mb-1">MERT AUTO SERVIS</h1>
        <p className="text-xs sm:text-sm mb-2 md:mb-4">Kalitenin Adresi</p>
        <Link
          href="/pages/contact"
          className="bg-black text-white text-[10px] sm:text-xs px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          {contactInfo.phone}
        </Link>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 bottom-4 flex space-x-2">
        <button 
          className="bg-white bg-opacity-50 p-2 rounded-full"
          onClick={handlePrevImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button 
          className="bg-white bg-opacity-50 p-2 rounded-full"
          onClick={handleNextImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
} 