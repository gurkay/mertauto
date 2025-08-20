'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Hakkımızda
          </h1>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
              <span className="inline-block relative">
                Güvenilir Servis
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Aracınız bizim için sadece bir taşıt değil, sizin güvenliğinizin ve konforunuzun bir parçasıdır. İşte bu yüzden Mert Auto Servis olarak yıllardır araç bakım ve onarımında güvenilir hizmet sunuyoruz.
              </p>
              <p>
                Deneyimli ustalarımız ve gelişmiş ekipmanlarımızla, aracınızın tüm ihtiyaçlarını titizlikle karşılıyoruz. İster periyodik bakım, ister motor arızası, isterse de bir çiziğin onarımı olsun — her işi en iyi şekilde yapmayı ilke edindik.
              </p>
              <p>
                Müşterilerimizle kurduğumuz güçlü iletişim, kaliteli hizmet anlayışımızın temelidir. Size zaman kazandırmak, aracınızı uzun ömürlü tutmak ve trafikte daima güvenle yol almasını sağlamak için buradayız.
              </p>
              <p className="font-semibold text-lg">
                Kaliteli hizmet, uygun fiyat, dürüst yaklaşım.
              </p>
              <p>
                Bizi tercih ettiğiniz için teşekkür ederiz!
              </p>
            </div>

            <div className="mt-8">
              <Link href="/pages/contact" className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md">
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-[400px] md:h-[500px]">
              <Image
                src="/images/garage/hero-image-3.jpg"
                alt="Mert Auto Servis Atölyesi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-40"></div>
              
              <div className="absolute bottom-6 left-6 bg-gray-900 p-4 rounded-lg shadow-lg flex items-center opacity-80">
                <Image
                  src="/images/icons/mert-auto-icon.png"
                  alt="Mert Auto Logo"
                  width={50}
                  height={50}
                  className="mr-3"
                />
                <div>
                  <h3 className="font-bold text-gray-200">Mert Auto</h3>
                  <p className="text-sm text-gray-600">Kalitenin Adresi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hızlı ve Güvenilir</h3>
            <p className="text-gray-600">
              En hızlı sürede, en kaliteli ve güvenilir hizmeti sunarak aracınızı yola hazırlıyoruz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Profesyonel Ekip</h3>
            <p className="text-gray-600">
              Yılların deneyimine sahip uzman kadromuzla aracınıza en iyi bakımı sağlıyoruz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Uygun Fiyatlar</h3>
            <p className="text-gray-600">
              Kaliteli hizmeti uygun fiyatlarla sunarak bütçenizi zorlamadan aracınızı yeniliyoruz.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-800 rounded-2xl p-10 lg:p-12 text-white shadow-xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Aracınız İçin En İyi Bakımı Alın</h2>
          <p className="text-lg mb-8 opacity-90">Profesyonel ekibimizle hizmetinizdeyiz</p>
          <Link href="/pages/contact" className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
}
