"use client"

import appClient from "@/lib/appClient"
import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Calendar,
    Heart,
    TrendingUp,
    ArrowRight,
    User,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Star,
    Share2,
    Bookmark,
    Newspaper,
    Hash
} from "lucide-react"
import { useRouter } from "next/navigation"
import { NewsItem } from "@/type/news.type"

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

    // Dummy trending news for right sidebar
    const trendingNews = [
        {
            id: 1,
            title: "Bitcoin Surpasses $120K",
            category: "Crypto",
            views: "12.4k",
            trending: true
        },
        {
            id: 2,
            title: "Ethereum 2.0 Launch Date Announced",
            category: "Blockchain",
            views: "8.7k",
            trending: true
        },
        {
            id: 3,
            title: "NFT Market Shows Recovery Signs",
            category: "NFT",
            views: "5.2k",
            trending: false
        },
        {
            id: 4,
            title: "New Crypto Regulations in Europe",
            category: "Regulation",
            views: "3.9k",
            trending: true
        },
        {
            id: 5,
            title: "DeFi TVL Hits All-Time High",
            category: "DeFi",
            views: "2.8k",
            trending: false
        }
    ]

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

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    const handleGetNews = useCallback(async (page: number, limit: number) => {
        try {
            setLoading(true)
            const res = await appClient.get("/api/news/get", {
                params: { page: page, limit: limit }
            })

            console.log("API Response:", res.data)

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

    const renderPagination = () => {
        const pages = []
        const maxVisible = 5
        let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
        let endPage = Math.min(pagination.totalPages, startPage + maxVisible - 1)

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${page === i
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

    if (loading && news.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#040720] border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading news...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content - Left Column (2/3) */}
                    <div className="lg:w-2/3">
                        {/* Breaking/Featured News - First Item */}
                        {news.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                                    onClick={() => handleNewsClick(news[0].slug)}
                                >
                                    {/* Featured Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg">
                                            <Sparkles className="w-4 h-4" />
                                            <span className="font-bold text-sm">BREAKING NEWS</span>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    {news[0].category && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                                                <span className="text-sm font-semibold text-text-primary capitalize">
                                                    {news[0].category.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                                        <img
                                            src={news[0].image}
                                            alt={news[0].heading}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{formatDate(news[0].publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {/* <div className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">{news[0].viewsCount}</span>
                                                </div> */}
                                                <div className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    <span className="text-sm">{news[0].likesCount}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                                            {news[0].heading}
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-200 mb-6">
                                            {news[0].subheading}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-text-primary/5 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{news[0].author}</div>
                                                    <div className="text-sm text-gray-300">Author</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                                                    <Bookmark className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Read More Button */}
                                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="flex items-center gap-2 px-6 py-3 bg-background text-text-primary rounded-full font-semibold transition-colors">
                                            Read Full Story
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Latest News Grid */}
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
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="bg-text-primary/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                        onClick={() => handleNewsClick(item.slug)}
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.heading}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                            {/* Category Badge */}
                                            {item.category && (
                                                <div className="absolute top-3 left-3">
                                                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                                        <span className="text-xs font-semibold text-text-primary capitalize">
                                                            {item.category.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Featured Badge */}
                                            {item.isFeatured && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full">
                                                        <Star className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2 text-sm text-text-primary/60">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(item.publishedAt)}</span>
                                                </div>
                                                {/* <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>{item.viewsCount}</span>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <h3 className="text-lg font-bold text-text-primary/80 mb-2 line-clamp-2 group-hover:text-text-primary transition-colors">
                                                {item.heading}
                                            </h3>
                                            <p className="text-text-primary/80 mb-4 line-clamp-2">
                                                {item.subheading}
                                            </p>

                                            {/* Tags */}
                                            {item.tags && item.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2 items-center">
                                                    {item.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag._id}
                                                            className="text-text-primary/70 text-xs transition-colors"
                                                        >
                                                            #{tag.name}
                                                        </span>
                                                    ))}
                                                    {item.tags.length > 3 && (
                                                        <span className="text-text-primary/70 rounded-md text-xs">
                                                            +{item.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-text-primary/10">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-text-primary/5 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-text-primary/90" />
                                                    </div>
                                                    <span className="text-sm text-text-primary/80">{item.author}</span>
                                                </div>
                                                <button className="flex items-center gap-1 text-text-primary/50 hover:text-text-primary/70 text-sm font-medium">
                                                    Read More
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-12">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-600">
                                        Showing page {page} of {pagination.totalPages}
                                        <span className="mx-2">•</span>
                                        {pagination.totalDocs} total articles
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handlePrevPage}
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
                                            onClick={handleNextPage}
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
                        )}
                    </div>

                    {/* Right Sidebar - Trending & Categories (1/3) */}
                    <div className="lg:w-1/3">
                        {/* Trending News */}
                        <div className="bg-text-primary/5 rounded-xl shadow-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                    Trending Now
                                </h3>
                                {/* <Fire className="w-5 h-5 text-orange-500" /> */}
                            </div>

                            <div className="space-y-4">
                                {trendingNews.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-text-primary/5 transition-colors">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-text-primary/70 group-hover:text-text-primary/80 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="px-2 py-0.5 bg-text-primary/10 text-text-primary/70 rounded-full text-xs">
                                                        {item.category}
                                                    </span>
                                                    {/* <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {item.views}
                                                    </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                View All Trending
                            </button> */}
                        </div>

                        {/* Categories */}
                        <div className="bg-text-primary/5 rounded-xl shadow-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-6">
                                <Hash className="w-6 h-6 text-text-primary" />
                                Popular Categories
                            </h3>

                            <div className="space-y-3">
                                {[
                                    { name: 'Crypto', count: 24, color: 'from-orange-500 to-red-500' },
                                    { name: 'Blockchain', count: 18, color: 'from-blue-500 to-cyan-500' },
                                    { name: 'NFT', count: 12, color: 'from-purple-500 to-pink-500' },
                                    { name: 'DeFi', count: 9, color: 'from-green-500 to-emerald-500' },
                                    { name: 'Regulation', count: 7, color: 'from-gray-600 to-gray-800' },
                                    { name: 'Innovation', count: 15, color: 'from-indigo-500 to-blue-500' },
                                ].map((category, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-text-primary/5 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                                <BookOpen className="w-5 h-5 text-white" />
                                            </div> */}
                                            <div>
                                                <h4 className="font-semibold text-text-primary group-hover:text-text-primary/50 transition-colors">
                                                    {category.name}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-text-primary/10 text-text-primary/70 rounded-full text-sm font-medium">
                                            {category.count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-text-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Newspaper className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-2">
                                    Stay Updated
                                </h3>
                                <p className="text-gray-600">
                                    Get daily news updates delivered to your inbox
                                </p>
                            </div>

                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Subscribe Now
                                </button>
                            </form>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsAndBlogsPage