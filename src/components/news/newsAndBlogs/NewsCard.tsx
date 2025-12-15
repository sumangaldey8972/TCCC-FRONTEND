// components/news/NewsCard.tsx
"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Star } from "lucide-react"
import { NewsItem } from "@/type/news.type"

interface NewsCardProps {
    news: NewsItem
    index: number
    onClick: (slug: string) => void
    formatDate: (dateString: string) => string
}

const NewsCard = ({ news, index, onClick, formatDate }: NewsCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-text-primary/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={() => onClick(news.slug)}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={news.image}
                    alt={news.heading}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Category Badge */}
                {news.category && (
                    <div className="absolute top-3 left-3">
                        <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                            <span className="text-xs font-semibold text-text-primary capitalize">
                                {news.category.name}
                            </span>
                        </div>
                    </div>
                )}

                {/* Featured Badge */}
                {news.isFeatured && (
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
                        <span>{formatDate(news.publishedAt)}</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-text-primary/80 mb-2 line-clamp-2 group-hover:text-text-primary transition-colors">
                    {news.heading}
                </h3>
                <p className="text-text-primary/80 mb-4 line-clamp-2">
                    {news.subheading}
                </p>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2 items-center">
                        {news.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag._id}
                                className="text-text-primary/70 text-xs transition-colors"
                            >
                                #{tag.name}
                            </span>
                        ))}
                        {news.tags.length > 3 && (
                            <span className="text-text-primary/70 rounded-md text-xs">
                                +{news.tags.length - 3}
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
                        <span className="text-sm text-text-primary/80">{news.author}</span>
                    </div>
                    <button className="flex items-center gap-1 text-text-primary/50 hover:text-text-primary/70 text-sm font-medium">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default NewsCard