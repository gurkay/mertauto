'use client';


import { contactInfo } from '@/constants/contactInfo';
import Link from 'next/link';

import { useState } from 'react';

function ContactPage() {
    const [mapLoaded, setMapLoaded] = useState(true);
    
    const openGoogleMapsDirections = () => {
        // Remove space and use correct format for Google Maps
        const formattedCoords = contactInfo.coordinates.replace(/\s/g, '');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${formattedCoords}`, '_blank');
    };
    
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        İletişim
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mert Auto Garage'a nasıl ulaşacağınızı öğrenin
                    </p>
                </div>
                
                {/* Contact Information and Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Contact Information Cards */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start">
                                <div className="bg-gray-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Adres</h3>
                                    <p className="text-gray-600">{contactInfo.address}</p>
                                    <p className="text-gray-500 text-sm mt-2">Koordinatlar: {contactInfo.coordinates}</p>
                                    <button 
                                        onClick={openGoogleMapsDirections}
                                        className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        Yol Tarifi Al
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Phone Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start">
                                <div className="bg-gray-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Telefon</h3>
                                    <p className="text-gray-600">{contactInfo.phone}</p>
                                    <Link
                                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Hemen Ara
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/* Working Hours Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start">
                                <div className="bg-gray-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Çalışma Saatleri</h3>
                                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                                        <div>Pazartesi - Cuma:</div>
                                        <div>08:30 - 18:30</div>
                                        <div>Cumartesi:</div>
                                        <div>09:00 - 17:00</div>
                                        <div>Pazar:</div>
                                        <div className="text-red-500">Kapalı</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Google Map */}
                    <div className="h-full min-h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                        <iframe 
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.8082418123787!2d29.892367!3d38.039840!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAyJzIzLjQiTiAyOcKwNTMnMzkuMCJF!5e0!3m2!1str!2str!4v1625847693576!5m2!1str!2str`}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            onLoad={() => setMapLoaded(true)}
                        ></iframe>
                        {!mapLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        <button
                            onClick={openGoogleMapsDirections}
                            className="absolute bottom-4 right-4 bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Google Haritada Aç
                        </button>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Aracınız için en iyi hizmet bir telefon kadar uzakta!</h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Mert Auto Garage olarak aracınızın bakım ve onarımı için profesyonel hizmet sunuyoruz. 
                        Randevu almak veya detaylı bilgi edinmek için bize ulaşın.
                    </p>
                    <Link
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        className="inline-block bg-white text-gray-800 font-bold text-lg px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
                    >
                        {contactInfo.phone}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;