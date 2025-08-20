import Image from 'next/image';
import Link from 'next/link';

export default function Collections() {
  const collections = [
    { name: 'Ford', image: '/images/cars/ford1.jpg', href: '/brands/ford' },
    { name: 'Honda', image: '/images/cars/honda1.jpg', href: '/brands/honda' },
    { name: 'Audi', image: '/images/cars/audi2.jpg', href: '/brands/audi' },
    { name: 'Cupra', image: '/images/cars/cupra1.jpg', href: '/brands/cupra' },
    { name: 'Volkswagen', image: '/images/cars/vw1.jpg', href: '/brands/volkswagen' },
    { name: 'Skoda', image: '/images/cars/skoda1.jpg', href: '/brands/skoda' },
    { name: 'Seat', image: '/images/cars/seat1.jpg', href: '/brands/seat' },
    { name: 'Fiat', image: '/images/cars/fiat1.jpg', href: '/brands/fiat' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-800 font-bold mb-3">Modellerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Mert Auto Servis'te Onarılabilecek Modeller</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {collections.map((collection) => (
            <Link key={collection.name} href={collection.href}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-100">
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-56">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                    <h3 className="bg-gray-200 bg-opacity-50 rounded-lg font-medium text-white text-sm sm:text-base">{collection.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* <div className="text-right mt-6">
          <Link
            href="/collections"
            className="inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800"
          >
            See more
          </Link>
        </div> */}
      </div>
    </section>
  );
} 