"use client"

import { motion } from "framer-motion"
import {
    Calendar,
    Heart,
    User,
    Share2,
    Bookmark,
    ArrowRight,
    Sparkles,
    Star
} from "lucide-react"
import { NewsItem } from "@/type/news.type"

interface BreakingNewsCardProps {
    news: NewsItem
    onClick: (slug: string) => void
    formatDate: (dateString: string) => string
}

const BreakingNewsCard = ({ news, onClick, formatDate }: BreakingNewsCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <div
                className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={() => onClick(news.slug)}
            >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold text-sm">BREAKING NEWS</span>
                    </div>
                </div>

                {/* Category Badge */}
                {news.category && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                            <span className="text-sm font-semibold text-text-primary capitalize">
                                {news.category.name}
                            </span>
                        </div>
                    </div>
                )}

                {/* Image */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.heading}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{formatDate(news.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{news.likesCount}</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                        {news.heading}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                        {news.subheading}
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-text-primary/5 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-medium">{news.author}</div>
                                <div className="text-sm text-gray-300">Author</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Handle share
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Handle bookmark
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
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
    )
}

export default BreakingNewsCard