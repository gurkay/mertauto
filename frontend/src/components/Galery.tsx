'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Galery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const galleryImages = [
        '/images/galeri/IMG_3485.JPG',
        '/images/galeri/IMG_3486.JPG',
        '/images/galeri/IMG_3488.JPG',
        '/images/galeri/IMG_3490.JPG',
        '/images/galeri/IMG_3497.JPG',
        '/images/galeri/IMG_3499.JPG',
        '/images/galeri/IMG_3502.JPG',
        '/images/galeri/IMG_3512.JPG',
        '/images/galeri/IMG_3514.JPG',
        '/images/galeri/IMG_3519.JPG',
        '/images/galeri/IMG_3523.JPG',
        '/images/galeri/IMG_3526.JPG',
    ];

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const openLightbox = (imagePath: string) => {
        setSelectedImage(imagePath);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Galeri
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mert Auto Garage'ın özel galerisi - atölyemizden ve tamamladığımız projelerden görüntüler
                    </p>
                </div>

                {/* Gallery Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {galleryImages.map((image, index) => (
                            <div 
                                key={index} 
                                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                onClick={() => openLightbox(image)}
                            >
                                <div className="relative aspect-[4/3] cursor-pointer">
                                    <Image
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                        <div className="relative max-w-6xl w-full h-full max-h-[80vh] flex items-center justify-center">
                            <button 
                                className="absolute top-4 right-4 bg-white rounded-full p-2 z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeLightbox();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
                                <Image
                                    src={selectedImage}
                                    alt="Enlarged gallery image"
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}