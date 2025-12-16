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
    const subCategoryName = path.split("/")[3]
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
                    subCategoryName: subCategoryName,
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

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">

                    <InnovationGrid
                        news={news}
                        innovationIcons={innovationIcons}
                        onNewsClick={handleNewsClick}
                        getTimeAgo={getTimeAgo}
                        subCategory={subCategoryName}
                    />

                    {pagination.totalPages > 1 && (
                        <InnovationPagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}

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
                                    <span className="capitalize" >  {subCategoryName} </span> Stories
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