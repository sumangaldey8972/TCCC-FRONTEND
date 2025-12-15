// components/news/PaginationControls.tsx
"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationInfo {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}

interface PaginationControlsProps {
    pagination: PaginationInfo
    onPageChange: (page: number) => void
    onPrevPage: () => void
    onNextPage: () => void
}

const PaginationControls = ({
    pagination,
    onPageChange,
    onPrevPage,
    onNextPage
}: PaginationControlsProps) => {
    const renderPagination = () => {
        const pages = []
        const maxVisible = 5
        let startPage = Math.max(1, pagination.page - Math.floor(maxVisible / 2))
        let endPage = Math.min(pagination.totalPages, startPage + maxVisible - 1)

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${pagination.page === i
                        ? 'bg-background text-text-primary border border-text-primary/20 shadow-lg'
                        : 'bg-text-primary/10 text-text-primary/60 hover:bg-gray-200 hover:text-text-primary'
                        }`}
                >
                    {i}
                </button>
            )
        }

        return pages
    }

    if (pagination.totalPages <= 1) return null

    return (
        <div className="mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                    Showing page {pagination.page} of {pagination.totalPages}
                    <span className="mx-2">•</span>
                    {pagination.totalDocs} total articles
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrevPage}
                        disabled={!pagination.hasPrevPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${!pagination.hasPrevPage
                            ? 'bg-text-primary/10 text-text-primary/40 cursor-not-allowed'
                            : 'bg-text-primary/10 text-text-primary/80 hover:bg-text-primary/30 hover:text-text-primary/80'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {renderPagination()}
                    </div>

                    <button
                        onClick={onNextPage}
                        disabled={!pagination.hasNextPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${!pagination.hasNextPage
                            ? 'bg-text-primary/10 text-text-primary/40 cursor-not-allowed'
                            : 'bg-text-primary/10 text-text-primary/80 hover:bg-text-primary/30 hover:text-text-primary/80'
                            }`}
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaginationControls