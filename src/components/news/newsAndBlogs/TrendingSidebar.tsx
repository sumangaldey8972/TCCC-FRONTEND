// components/news/TrendingSidebar.tsx
"use client"

import { motion } from "framer-motion"
import { TrendingUp, Hash } from "lucide-react"

interface TrendingItem {
    id: number
    title: string
    category: string
    views: string
    trending: boolean
}

interface CategoryItem {
    name: string
    count: number
    color: string
}

interface TrendingSidebarProps {
    trendingNews?: TrendingItem[]
    categories?: CategoryItem[]
}

const TrendingSidebar = ({
    trendingNews = [],
    categories = []
}: TrendingSidebarProps) => {
    // Default trending news if not provided
    const defaultTrendingNews: TrendingItem[] = [
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

    const defaultCategories: CategoryItem[] = [
        { name: 'Crypto', count: 24, color: 'from-orange-500 to-red-500' },
        { name: 'Blockchain', count: 18, color: 'from-blue-500 to-cyan-500' },
        { name: 'NFT', count: 12, color: 'from-purple-500 to-pink-500' },
        { name: 'DeFi', count: 9, color: 'from-green-500 to-emerald-500' },
        { name: 'Regulation', count: 7, color: 'from-gray-600 to-gray-800' },
        { name: 'Innovation', count: 15, color: 'from-indigo-500 to-blue-500' },
    ]

    const displayTrendingNews = trendingNews.length > 0 ? trendingNews : defaultTrendingNews
    const displayCategories = categories.length > 0 ? categories : defaultCategories

    return (
        <div className="lg:w-1/3">
            {/* Trending News */}
            <div className="bg-text-primary/5 rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-orange-500" />
                        Trending Now
                    </h3>
                </div>

                <div className="space-y-4">
                    {displayTrendingNews.map((item, index) => (
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
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-text-primary/5 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2 mb-6">
                    <Hash className="w-6 h-6 text-text-primary" />
                    Popular Categories
                </h3>

                <div className="space-y-3">
                    {displayCategories.map((category, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-text-primary/5 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
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
        </div>
    )
}

export default TrendingSidebar