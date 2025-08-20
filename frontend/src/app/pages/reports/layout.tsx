import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { getServerAuthSession } from "@/utils/auth";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function ReportsLayout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      {/* Only show a back button instead of the full header */}
      <div className="bg-gray-100 shadow-sm p-3">
        <Link 
          href="/dashboard" 
          className="flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left mr-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Dashboard'a Dön
        </Link>
      </div>
      
      <div className="flex-grow">
        {children}
      </div>
      
      <footer className="bg-gray-700 text-white py-2 text-center text-sm">
        <p>© {new Date().getFullYear()} Mert Auto - Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
} 