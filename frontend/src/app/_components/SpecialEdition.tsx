import Image from 'next/image';

export default function SpecialEdition() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Special edition</h2>
          <p className="text-gray-600">Enjoy new specification so special</p>
        </div>

        <div className="relative h-[400px] w-full">
          <Image
            src="/images/bmw-x300-blue-angle.jpg"
            alt="BMW X300 Special Edition"
            fill
            className="object-cover rounded-lg"
          />
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center bg-white bg-opacity-90 px-8 py-4 rounded">
            <h3 className="font-bold text-xl">BMW X300</h3>
            <p className="text-sm text-gray-700">2023 edition</p>
          </div>
        </div>
      </div>
    </section>
  );
} 