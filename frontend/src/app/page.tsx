import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Collections from "./_components/Collections";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";

export const metadata: Metadata = {
  title: "Mert Auto",
  description: "Araba hastanesi - araba yağ bakımı, km kontrolü ve genel bakım kontrolleri",
};

const inter = Inter({ subsets: ["latin"] });
export default async function Home() {
  return (
    <>
      <main className={inter.className}>
        {/* <CategoryTabs /> */}
        <HeroSection />
        <Collections />
        {/* <SpecialEdition /> */}
        {/* <MostPopular /> */}
        {/* <ModelsOfWeek /> */}
      </main>
      <Footer />
    </>
  );
}
