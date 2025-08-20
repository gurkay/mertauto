import { Metadata } from 'next'
import './styles/globals.css'
import Header from "./_components/layout/header";
import { getServerAuthSession } from "@/utils/auth";
import Providers from "@/components/Providers";
import IsEmirleriRaport from './pages/reports/page';

export const metadata: Metadata = {
  metadataBase: new URL('https://mertautogarage.com'),
  title: {
    template: '%s | Auto Servis',
    default: 'Araba Tamiri ve Bakım',
  },
  description: 'Araba hastanesi - araba yağ bakımı, km kontrolü ve genel bakım kontrolleri',
  keywords: [
    // Türkçe Anahtar Kelimeler
    'araba tamiri',
    'araba yağ bakımı',
    'araba genel bakım'
  ],
  authors: [{ name: 'Mert Auto' }],
  creator: 'Mert Auto',
  publisher: 'Mert Auto',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mertautogarage.com',
    languages: {
      'tr-TR': 'https://mertautogarage.com/tr',
      'en-US': 'https://mertautogarage.com/en',
    },
  },
  openGraph: {
    title: 'Mert Auto - Araba Tamiri ve Bakım',
    description: 'Araba hastanesi - araba yağ bakımı, km kontrolü ve genel bakım kontrolleri',
    url: 'https://mertautogarage.com',
    siteName: 'Mert Auto',
    images: [
      {
        url: 'https://mertautogarage.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mert Auto Platform Preview',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mert Auto - Araba Tamiri ve Bakım',
    description: 'Araba hastanesi - araba yağ bakımı, km kontrolü ve genel bakım kontrolleri',
    images: ['https://mertautogarage.com/twitter-image.jpg'],
  },
  other: {
    'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    'yandex-verification': 'YOUR_YANDEX_VERIFICATION_CODE',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  console.log("session", session);
  return (
    <html lang="tr">
      <head>
        <link rel="alternate" hrefLang="tr" href="https://mertautogarage.com/tr" />
        <link rel="alternate" hrefLang="en" href="https://mertautogarage.com/en" />
        <link rel="canonical" href="https://mertautogarage.com" />
        
        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Araba Tamiri ve Bakım",
              "name": "Mert Auto",
              "description": "Araba hastanesi - araba yağ bakımı, km kontrolü ve genel bakım kontrolleri",
              "applicationCategory": "Araba Tamiri ve Bakım",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header session={session} />
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
        
      </body>
    </html>
  );
}
