import Image from 'next/image';
import Link from 'next/link';

export default function MostPopular() {
  const popularCars = [
    {
      name: 'Rolls royce',
      image: '/images/rolls-royce-white.jpg',
      href: '/cars/rolls-royce'
    },
    {
      name: 'Lexus jeep',
      image: '/images/lexus-suv.jpg',
      href: '/cars/lexus-jeep'
    },
    {
      name: 'Toyota truck',
      image: '/images/toyota-truck.jpg',
      href: '/cars/toyota-truck'
    },
    {
      name: 'BMW M5',
      image: '/images/bmw-m5.jpg',
      href: '/cars/bmw-m5'
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Most popular</h2>
          <p className="text-gray-600 text-sm">Our popular picks for most favorited rides Men's & Women's choices</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {popularCars.map((car) => (
            <Link href={car.href} key={car.name}>
              <div className="group overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl relative">
                <div className="relative h-56 w-full">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 bg-white">
                  <h3 className="font-medium text-lg">{car.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-right mt-6">
          <Link
            href="/popular"
            className="inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
} 