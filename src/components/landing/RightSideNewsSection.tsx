"use client";

import { db } from "@/lib/config/firebaseConfig";
import { NewsInterface } from "@/type/news.type";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RightSideNewsSection = () => {
    const [newsData, setNewsData] = useState<NewsInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const q = query(collection(db, "news"), orderBy("createdAt", "desc"), limit(5));
                const querySnapshot = await getDocs(q);

                const newsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as NewsInterface[];

                setNewsData(newsList);
            } catch (error) {
                console.error("🔥 Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
        return formatDate(dateString)
    }

    // Shimmer loading component
    const NewsShimmer = () => (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className="relative p-4 bg-gray-800/50 rounded-lg border border-gray-700 animate-pulse"
                >
                    <div className="flex items-start space-x-3">
                        {/* Bullet shimmer */}
                        <div className="flex-shrink-0 w-2 h-2 mt-2 bg-gray-600 rounded-full"></div>

                        <div className="flex-1 min-w-0 space-y-3">
                            {/* Title shimmer */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                            </div>

                            {/* Meta info shimmer */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                                    <div className="h-3 bg-gray-600 rounded w-16"></div>
                                </div>
                                <div className="h-3 bg-gray-600 rounded w-20"></div>
                            </div>
                        </div>

                        {/* External link shimmer */}
                        <div className="flex-shrink-0 w-4 h-4 mt-1 bg-gray-600 rounded"></div>
                    </div>

                    {/* Shimmer animation overlay */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-700/10 to-transparent"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full h-full" >
            <div className="text-white p-3 bg-text-primary/50   rounded-xl border border-gray-700 shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-lg font-bold text-background">
                            Latest News
                        </h2>
                    </div>
                    <button onClick={() => router.replace("/news-blogs")} className="text-sm group flex items-center space-x-2 text-background/70 hover:text-[#FFD700] transition-all duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-gray-800/50 border border-transparent hover:border-gray-600">
                        <span>View All News</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>

                {/* News Headlines */}
                <div className="space-y-4">
                    {loading ? (
                        <NewsShimmer />
                    ) : newsData.length > 0 ? (
                        newsData.map((news) => (
                            <div
                                onClick={() => router.replace(`/news/${news.slug}`)}
                                key={news.id}
                                className="group relative p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-[#bf953f]/50 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-[#bf953f]/10 cursor-pointer"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#FFD700] rounded-full"></div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white text-sm font-semibold group-hover:text-[#FFD700] transition-colors duration-300 line-clamp-2">
                                            {news.heading}
                                        </h3>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                            <span className="flex items-center space-x-1">
                                                <Calendar size={12} />
                                                <span>
                                                    {news.createdAt ? getTimeAgo(news.createdAt) : ""}
                                                </span>
                                            </span>
                                            {news.category?.name && (
                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                                                    {news.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">No news available</div>
                            <div className="text-gray-500 text-sm">Check back later for updates</div>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-6 text-sm text-background/80">
                        <span className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-gray-600' : 'bg-green-400'
                                }`}></div>
                            <span>{loading ? 'Loading...' : 'Live Updates'}</span>
                        </span>
                        <span>•</span>
                        <span>
                            {loading ? (
                                <div className="h-3 w-20 bg-gray-600 rounded animate-pulse"></div>
                            ) : (
                                `${newsData.length} breaking stories`
                            )}
                        </span>
                    </div>
                    <div className="text-xs text-background">
                        {loading ? (
                            <div className="h-3 w-16 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                            'Updated just now'
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default RightSideNewsSection;