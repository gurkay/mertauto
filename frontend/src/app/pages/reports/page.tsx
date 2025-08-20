"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function IsEmirleriRaport() {
    const searchParams = useSearchParams();
    const isPrintMode = searchParams.get('print') === 'true';

    useEffect(() => {
        // Set the page title
        document.title = "İş Emirleri Raporu";
        
        if (isPrintMode) {
            // Hide header with CSS
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
            
            // Optionally auto-print
            setTimeout(() => {
                window.print();
            }, 500);
            
            // Restore header when component unmounts
            return () => {
                const header = document.querySelector('header');
                if (header) header.style.display = '';
            };
        }
    }, [isPrintMode]);

    return (
        <div className={`min-h-screen bg-gray-50 ${isPrintMode ? 'pt-0' : 'pt-4'} px-4 sm:px-6 lg:px-8`}>
            <div className="mb-8 pt-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">İş Emirleri Raporu</h1>
                <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                {/* Report content goes here */}
                <p className="text-gray-600">Rapor içeriği burada gösterilecektir.</p>
            </div>
        </div>
    );
}