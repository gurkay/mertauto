'use client';

import { contactInfo } from '@/constants/contactInfo';
import Image from 'next/image';
import { useState } from 'react';

export default function Services() {
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    const services = [
        {
            id: 1,
            name: 'Motor Revizyonu',
            description: 'Profesyonel motor bakım ve tamir hizmetleri ile aracınızın performansını arttırın.',
            image: '/images/galeri/IMG_3514.JPG',
            icon: '🔧'
        },
        {
            id: 2,
            name: 'Fren Sistemi Bakımı',
            description: 'Güvenliğiniz için fren sisteminizin bakımını ve tamirini uzman ekibimize emanet edin.',
            image: '/images/galeri/IMG_3502.JPG',
            icon: '🛑'
        },
        {
            id: 3,
            name: 'Volkswagen Servisi',
            description: 'Volkswagen marka araçlarınız için özel servis ve yedek parça hizmetleri.',
            image: '/images/logo/volkswagen-logo.jpg',
            icon: '🚗'
        },
        {
            id: 4,
            name: 'Honda Uzman Servisi',
            description: 'Honda araçlarınız için profesyonel bakım, onarım ve performans artırıcı çözümler.',
            image: '/images/logo/honda-logo.png',
            icon: '🏁'
        },
        {
            id: 5,
            name: 'Karoseri Onarımı',
            description: 'Kaza sonrası karoseri onarımı ve profesyonel boya hizmetleri ile aracınız fabrikadan çıkmış gibi olacak.',
            image: '/images/galeri/IMG_3519.JPG',
            icon: '🖌️'
        },
        {
            id: 6,
            name: 'Elektrik ve Elektronik Sistemler',
            description: 'Modern araçların karmaşık elektrik ve elektronik sistemleri için uzman teşhis ve onarım.',
            image: '/images/galeri/IMG_3499.JPG',
            icon: '⚡'
        },
        {
            id: 7,
            name: 'Ford Uzman Servisi',
            description: 'Ford araçlarınız için özel servis, diagnostik ve orijinal parça hizmetleri.',
            image: '/images/cars/ford1.jpg',
            icon: '⭐'
        },
        {
            id: 8,
            name: 'Şanzıman Bakım ve Onarımı',
            description: 'Manuel ve otomatik şanzıman sistemlerinin bakımı, onarımı ve revizyonu için uzman hizmet.',
            image: '/images/garage/hero-image-2.jpg',
            icon: '⚙️'
        },
        {
            id: 9,
            name: 'Periyodik Bakım',
            description: 'Aracınızın ömrünü uzatmak ve performansını korumak için düzenli bakım hizmetleri.',
            image: '/images/garage/hero-image-5.jpg',
            icon: '📅'
        },
        {
            id: 10,
            name: 'Süspansiyon Sistemleri',
            description: 'Konforlu ve güvenli bir sürüş için süspansiyon sistemlerinizin bakım ve tamiratı.',
            image: '/images/garage/hero-image-7.JPG',
            icon: '🔄'
        }
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Servis Hizmetlerimiz
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mert Auto Garage olarak aracınıza en iyi bakımı sunuyoruz
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={service.id} 
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className={`object-cover transition-transform duration-700 ${hoveredService === index ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                                    {service.icon}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-gray-600">{service.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-500">Mert Auto Garage</span>
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gray-800 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Aracınız İçin En İyi Hizmeti Alın</h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Uzman ekibimiz ve modern ekipmanlarımızla aracınıza en iyi bakımı sunuyoruz. Randevu almak için hemen arayın.
                    </p>
                    <button className="bg-white text-gray-800 font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md">
                        {contactInfo.phone}
                    </button>
                </div>
            </div>
        </div>
    );
}