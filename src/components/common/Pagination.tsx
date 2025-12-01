"use client";

import { PaginationInfo } from "@/type/table";
import { motion } from "framer-motion";

interface PaginationProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const Pagination = ({ pagination, onPageChange, onLimitChange }: PaginationProps) => {
    const { page, totalPages, totalDocs, limit, hasPrevPage, hasNextPage } = pagination;

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 px-4 py-3 border-t border-text-primary/20 bg-background">
            {/* Results Info */}
            <div className="text-sm text-text-primary/70">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalDocs)} of {totalDocs} results
            </div>

            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
                {/* Limit Selector */}
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="px-3 py-1 border border-text-primary/20 rounded text-sm bg-background text-text-primary"
                >
                    {[5, 10, 20, 50].map(size => (
                        <option key={size} value={size}>{size} per page</option>
                    ))}
                </select>

                {/* Previous Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => hasPrevPage && onPageChange(page - 1)}
                    disabled={!hasPrevPage}
                    className="px-3 py-1 border border-text-primary/20 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed text-text-primary hover:bg-text-primary/5"
                >
                    Previous
                </motion.button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                    {pageNumbers.map(pageNum => (
                        <motion.button
                            key={pageNum}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => onPageChange(pageNum)}
                            className={`px-3 py-1 border rounded text-sm min-w-[40px] ${pageNum === page
                                ? 'bg-primary text-text-primary border-primary'
                                : 'border-text-primary/20 text-text-primary hover:bg-text-primary/5'
                                }`}
                        >
                            {pageNum}
                        </motion.button>
                    ))}
                </div>

                {/* Next Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => hasNextPage && onPageChange(page + 1)}
                    disabled={!hasNextPage}
                    className="px-3 py-1 border border-text-primary/20 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed text-text-primary hover:bg-text-primary/5"
                >
                    Next
                </motion.button>
            </div>
        </div>
    );
};

export default Pagination;