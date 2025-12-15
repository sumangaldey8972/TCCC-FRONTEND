// components/news/NewsAndBlogsPage.tsx
"use client"

import appClient from "@/lib/appClient"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Newspaper } from "lucide-react"
import { NewsItem } from "@/type/news.type"
import LoadingState from "@/components/news/newsAndBlogs/LoadingState"
import BreakingNewsCard from "@/components/news/newsAndBlogs/BreakingNewsCard"
import NewsCard from "@/components/news/newsAndBlogs/NewsCard"
import PaginationControls from "@/components/news/newsAndBlogs/PaginationControls"
import TrendingSidebar from "@/components/news/newsAndBlogs/TrendingSidebar"


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

const NewsAndBlogsPage = () => {
    const router = useRouter()
    const [news, setNews] = useState<NewsItem[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(11)
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState<PaginationInfo>({
        totalDocs: 0,
        limit: 11,
        totalPages: 0,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    })

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return 'Today'
        } else if (diffDays === 1) {
            return 'Yesterday'
        } else if (diffDays < 7) {
            return `${diffDays} days ago`
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        }
    }

    const handleGetNews = useCallback(async (page: number, limit: number) => {
        try {
            setLoading(true)
            const res = await appClient.get("/api/news/get", {
                params: { page: page, limit: limit }
            })

            if (res.data.status && res.data.news) {
                const newsData = res.data.news
                const newBlogs = newsData.docs || []

                setNews(newBlogs)
                setPagination({
                    totalDocs: newsData.totalDocs,
                    limit: newsData.limit,
                    totalPages: newsData.totalPages,
                    page: newsData.page,
                    hasPrevPage: newsData.hasPrevPage,
                    hasNextPage: newsData.hasNextPage,
                    prevPage: newsData.prevPage,
                    nextPage: newsData.nextPage
                })
            }
        } catch (error) {
            console.log("Error while getting news list", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        handleGetNews(page, limit)
    }, [page, limit, handleGetNews])

    const handleNewsClick = (slug: string) => {
        router.push(`/news-blogs/articles/${slug}`)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleNextPage = () => {
        if (pagination.hasNextPage) {
            setPage(pagination.nextPage!)
        }
    }

    const handlePrevPage = () => {
        if (pagination.hasPrevPage) {
            setPage(pagination.prevPage!)
        }
    }

    if (loading && news.length === 0) {
        return <LoadingState />
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content - Left Column (2/3) */}
                    <div className="lg:w-2/3">
                        {/* Breaking/Featured News - First Item */}
                        {news.length > 0 && (
                            <BreakingNewsCard
                                news={news[0]}
                                onClick={handleNewsClick}
                                formatDate={formatDate}
                            />
                        )}

                        {/* Latest News Grid */}
                        {news.length > 1 && (
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-text-primary/70 flex items-center gap-2">
                                        <Newspaper className="w-6 h-6 text-text-primary/50" />
                                        Latest News
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-text-primary/70">
                                        <span className="px-3 py-1 bg-text-primary/10 rounded-full">
                                            {pagination.totalDocs} Total Stories
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {news.slice(1).map((item, index) => (
                                        <NewsCard
                                            key={item._id}
                                            news={item}
                                            index={index}
                                            onClick={handleNewsClick}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        <PaginationControls
                            pagination={pagination}
                            onPageChange={handlePageChange}
                            onPrevPage={handlePrevPage}
                            onNextPage={handleNextPage}
                        />
                    </div>

                    {/* Right Sidebar - Trending & Categories (1/3) */}
                    <TrendingSidebar />
                </div>
            </div>
        </div>
    )
}

export default NewsAndBlogsPage