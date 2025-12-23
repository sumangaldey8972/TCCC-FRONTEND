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

    return (
        <div className="w-full h-full" >
            <div className="text-white p-3 bg-text-primary/5  backdrop-blur-xs rounded-xl border border-text-primary/10 shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-lg font-bold text-text-primary">
                            Latest News
                        </h2>
                    </div>
                    <button onClick={() => router.replace("/news-blogs")} className="backdrop-blur-xs shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-sm group flex items-center space-x-2 text-text-primary/70 hover:text-text-primary transition-all duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-text-primary/10 border border-text-primary/10 hover:border-text-primary/20">
                        <span>View All News</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>

                {/* News Headlines */}
                <div className="space-y-4">
                    {loading ? (
                        <span className="text-text-primary" >  Loading.... </span>
                    ) : newsData.length > 0 ? (
                        newsData.map((news) => (
                            <div
                                onClick={() => router.replace(`/news/${news.slug}`)}
                                key={news.id}
                                className="group relative p-2 bg-text-primary/10 rounded-lg border border-text-primary/10 hover:border-text-primary/30 transition-all duration-300 hover:bg-text-primary/20 hover:shadow-lg hover:shadow-[#bf953f]/10 cursor-pointer"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-text-primary rounded-full"></div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-text-primary/80 text-sm font-semibold group-hover:text-text-primary transition-colors duration-300 line-clamp-2">
                                            {news.heading}
                                        </h3>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-text-primary/70">
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
                            <div className="text-text-primary/70 mb-2">No news available</div>
                            <div className="text-text-primary/80 text-sm">Check back later for updates</div>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-6 text-sm text-text-primary/80">
                        <span className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-text-primary/30' : 'bg-green-400'
                                }`}></div>
                            <span>{loading ? 'Loading...' : 'Live Updates'}</span>
                        </span>
                        <span>•</span>
                        <span>
                            {loading ? (
                                <div className="h-3 w-20 bg-text-primary/30 rounded animate-pulse"></div>
                            ) : (
                                `${newsData.length} breaking stories`
                            )}
                        </span>
                    </div>
                    <div className="text-xs text-text-primary/70">
                        {loading ? (
                            <div className="h-3 w-16 bg-text-primary/30 rounded animate-pulse"></div>
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