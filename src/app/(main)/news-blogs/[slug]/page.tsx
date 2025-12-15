"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import appClient from "@/lib/appClient"
import { motion } from "framer-motion"
import {
    Rocket,
    Zap,
    Cpu,
    Globe,
    Shield,
    Sparkles,
    Users,
    Network,
    Code,
    Cloud,
    Brain,
    CpuIcon,
    ArrowRight,
    Heart,
    MessageCircle,
    Database,
} from "lucide-react"
import { NewsItem, PaginationInfo } from "@/type/news.type"
import InnovationHeader from "@/components/news/newsCategory/innovation/InnovationHeader"
import InnovationGrid from "@/components/news/newsCategory/innovation/InnovationGrid"
import InnovationPagination from "@/components/news/newsCategory/innovation/InnovationPagination"
import InnovationAd from "@/components/news/newsCategory/innovation/InnovationAd"
import InnovationPrinciples from "@/components/news/newsCategory/innovation/InnovationPrinciples"


// Web3/Innovation icons for visual appeal
const innovationIcons = [
    { icon: Rocket, color: "from-primary/20 to-purple-600/20" },
    { icon: Zap, color: "from-amber-500/20 to-orange-500/20" },
    { icon: Cpu, color: "from-blue-500/20 to-cyan-500/20" },
    { icon: Globe, color: "from-emerald-500/20 to-green-600/20" },
    { icon: Shield, color: "from-rose-500/20 to-red-600/20" },
    { icon: Network, color: "from-indigo-500/20 to-purple-600/20" },
    { icon: Database, color: "from-violet-500/20 to-purple-600/20" }, // Replaced Blockchain
    { icon: Code, color: "from-teal-500/20 to-green-600/20" },
    { icon: Cloud, color: "from-sky-500/20 to-blue-600/20" },
    { icon: Brain, color: "from-purple-500/20 to-pink-600/20" },
]

const InnovationNewsPage = () => {
    const router = useRouter()
    const path = usePathname()
    const categoryName = path.split("/")[2]
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit] = useState(11)
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

    const fetchInnovationNews = useCallback(async (page: number) => {
        try {
            setLoading(true)
            const res = await appClient.get("/api/news/get", {
                params: {
                    parentCategoryName: categoryName,
                    page: page,
                    limit: limit
                }
            })

            if (res.data?.status && res.data.news?.docs) {
                setNews(res.data.news.docs)
                setPagination({
                    totalDocs: res.data.news.totalDocs,
                    limit: res.data.news.limit,
                    totalPages: res.data.news.totalPages,
                    page: res.data.news.page,
                    hasPrevPage: res.data.news.hasPrevPage,
                    hasNextPage: res.data.news.hasNextPage,
                    prevPage: res.data.news.prevPage,
                    nextPage: res.data.news.nextPage
                })
            }
        } catch (error) {
            console.error("Error fetching innovation news:", error)
        } finally {
            setLoading(false)
        }
    }, [limit])

    useEffect(() => {
        fetchInnovationNews(page)
    }, [page, fetchInnovationNews])

    const handleNewsClick = (newsItem: NewsItem) => {
        router.push(`/news-blogs/articles/${newsItem.slug}`)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-20 border-4 border-transparent border-t-primary border-r-primary/30 rounded-full mx-auto mb-6"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CpuIcon className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <p className="text-primary text-lg font-medium tracking-wider">
                        Loading Innovation...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
            <InnovationHeader news={news} getTimeAgo={getTimeAgo} />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Featured Innovation News */}
                    {news.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-12"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Featured Innovation
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full border border-primary/20">
                                        Spotlight
                                    </span>
                                </div>
                            </div>

                            <div
                                className="relative rounded-2xl overflow-hidden cursor-pointer group border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                                onClick={() => handleNewsClick(news[0])}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                                <div className="p-6 md:p-8 relative">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full border border-primary/20">
                                                    <Zap className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-medium text-foreground">
                                                        BREAKTHROUGH
                                                    </span>
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {getTimeAgo(news[0].publishedAt)}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                                                {news[0].heading}
                                            </h3>
                                            <p className="text-lg text-muted-foreground mb-6">
                                                {news[0].subheading}
                                            </p>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center border border-primary/20">
                                                        <Users className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground">{news[0].author}</div>
                                                        <div className="text-xs text-muted-foreground">Innovation Reporter</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {news[0].tags?.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={tag._id}
                                                        className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg text-sm border border-primary/20 text-foreground"
                                                    >
                                                        #{tag.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <button className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                                <span>Explore Innovation</span>
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="w-5 h-5" />
                                                </motion.div>
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <div className="relative rounded-xl overflow-hidden border border-primary/20">
                                                <img
                                                    src={news[0].image}
                                                    alt={news[0].heading}
                                                    className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Heart className="w-4 h-4" />
                                                    <span>{news[0].likesCount || 0} likes</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>{news[0].commentsCount || 0} comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <InnovationGrid
                        news={news.slice(1)}
                        innovationIcons={innovationIcons}
                        onNewsClick={handleNewsClick}
                        getTimeAgo={getTimeAgo}
                    />

                    {pagination.totalPages > 1 && (
                        <InnovationPagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <InnovationAd />

                    <InnovationPrinciples />

                    {/* Floating Innovation Stats */}
                    <div className="fixed bottom-8 right-8 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                            className="bg-background/90 backdrop-blur-sm rounded-xl p-1 md:p-4 border border-primary/20 shadow-lg"
                        >
                            <div className="text-center">
                                <div className="text-sm font-bold text-primary mb-1">
                                    {pagination.totalDocs}
                                </div>
                                <div className="text-xxs text-muted-foreground">
                                    Innovation Stories
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default InnovationNewsPage