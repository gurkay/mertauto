import Image from 'next/image';
import Link from 'next/link';

export default function ModelsOfWeek() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Models of the week</h2>
            <p className="text-gray-600 mb-6">
              Geegoju ayobami, omolayo Isaac, tomilade
              oselusi and olutusoye partnered with BMW
              to model for the series from the brand.
            </p>
            <Link
              href="/interviews"
              className="inline-block border border-black text-black text-sm px-6 py-3 hover:bg-black hover:text-white transition-colors"
            >
              View interview
            </Link>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative h-[300px]">
              <Image
                src="/images/models-bmw.jpg"
                alt="BMW Models of the Week"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 