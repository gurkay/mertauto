'use client';

interface PaginationProps {
    totalPages: number;
    handlePageChange: (page: number) => void;
    page: number;
}

const Pagination = ({ totalPages, handlePageChange, page }: PaginationProps) => {
    // Calculate which page numbers to show (show 5 pages max with current page in the middle when possible)
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are 5 or fewer
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Determine start and end pages to show
            const currentPageIndex = page ?? 0;
            let startPage = Math.max(0, currentPageIndex - Math.floor(maxPagesToShow / 2));
            let endPage = startPage + maxPagesToShow - 1;
            
            if (endPage >= totalPages) {
                endPage = totalPages - 1;
                startPage = Math.max(0, endPage - maxPagesToShow + 1);
            }
            
            // First page
            pageNumbers.push(0);
            
            // Add ellipsis after first page if needed
            if (startPage > 1) {
                pageNumbers.push(-1); // -1 represents ellipsis
            }
            
            // Add pages around current page
            for (let i = Math.max(1, startPage); i < endPage; i++) {
                pageNumbers.push(i);
            }
            
            // Add ellipsis before last page if needed
            if (endPage < totalPages - 2) {
                pageNumbers.push(-2); // -2 represents ellipsis
            }
            
            // Last page if not already included
            if (endPage < totalPages - 1) {
                pageNumbers.push(totalPages - 1);
            }
        }
        
        return pageNumbers;
    };

    return (
        <nav aria-label="Sayfalama" className="mt-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange((page ?? 0) - 1)}
                    disabled={(page ?? 0) <= 0}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md 
                    transition-all duration-200 ease-in-out
                    text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Önceki sayfa"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Önceki</span>
                </button>

                {/* Page Numbers - Only visible on larger screens */}
                <div className="hidden sm:flex items-center">
                    {getPageNumbers().map((pageNum, index) => {
                        // Render ellipsis
                        if (pageNum < 0) {
                            return (
                                <span key={`ellipsis-${index}`} className=" px-3 py-2 text-blue-500 dark:text-blue-400">
                                    ...
                                </span>
                            );
                        }
                        
                        // Render page number button
                        return (
                            <button
                                key={`page-${pageNum}`}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3.5 py-2 text-sm font-medium rounded-md mx-0.5
                                ${(page ?? 0) === pageNum 
                                    ? 'bg-blue-600 text-white dark:bg-blue-700' 
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                                aria-current={(page ?? 0) === pageNum ? 'page' : undefined}
                            >
                                {pageNum + 1}
                            </button>
                        );
                    })}
                </div>

                {/* Current/Total Display - Always visible, but styled differently on mobile */}
                <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md border
                    text-gray-700 bg-white border-gray-300
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300
                    sm:mx-2">
                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        Sayfa <span className="font-semibold text-blue-600 dark:text-blue-400">{(page ?? 0) + 1}</span> / <span className="font-semibold text-blue-600 dark:text-blue-400">{totalPages}</span>
                    </span>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange((page ?? 0) + 1)}
                    disabled={(page ?? 0) >= (totalPages - 1)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md 
                    transition-all duration-200 ease-in-out
                    text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Sonraki sayfa"
                >
                    <span className="hidden sm:inline">Sonraki</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Pagination; 