import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface InnovationPaginationProps {
    pagination: {
        totalPages: number
        page: number
        hasPrevPage: boolean
        hasNextPage: boolean
        prevPage: number | null
        nextPage: number | null
        totalDocs: number
    }
    onPageChange: (page: number) => void
}

const InnovationPagination = ({ pagination, onPageChange }: InnovationPaginationProps) => {
    const handlePrevPage = () => {
        if (pagination.hasPrevPage) {
            onPageChange(pagination.prevPage!)
        }
    }

    const handleNextPage = () => {
        if (pagination.hasNextPage) {
            onPageChange(pagination.nextPage!)
        }
    }

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
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${pagination.page === i
                        ? 'bg-primary/20 text-foreground shadow-md border border-primary/30'
                        : 'bg-background text-muted-foreground hover:bg-primary/5 hover:text-foreground border border-primary/10'
                        }`}
                >
                    {i}
                </button>
            )
        }

        return pages
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20">
                <div className="text-sm text-muted-foreground">
                    Showing page {pagination.page} of {pagination.totalPages}
                    <span className="mx-2">•</span>
                    {pagination.totalDocs} total articles
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={!pagination.hasPrevPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${!pagination.hasPrevPage
                            ? 'bg-primary/5 text-muted-foreground cursor-not-allowed border border-primary/10'
                            : 'bg-background text-foreground hover:bg-primary/5 border border-primary/10 hover:border-primary/30'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {renderPagination()}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={!pagination.hasNextPage}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${!pagination.hasNextPage
                            ? 'bg-primary/5 text-muted-foreground cursor-not-allowed border border-primary/10'
                            : 'bg-background text-foreground hover:bg-primary/5 border border-primary/10 hover:border-primary/30'
                            }`}
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default InnovationPagination