"use client"

import appClient from "@/lib/appClient"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    ArrowLeft,
    Calendar,
    User,
    Eye,
    Heart,
    Share2,
    MessageCircle,
    Clock,
    Tag,
    Folder,
    AlertCircle,
    Loader2,
    Megaphone,
    Target,
    TrendingUp,
    BarChart3,
    Zap,
    Sparkles
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/lib/config/firebaseConfig"
import { motion } from "framer-motion"
import { NewsItem } from "@/type/news.type"
import CommentInput from "@/components/news/CommentInput"
import CommentsList, { Comment } from "@/components/news/CommentsList"

const NewsDetailPage = () => {
    const pathName = usePathname()
    const router = useRouter()
    const slug = pathName.split('/').filter(Boolean).pop()

    const [newsData, setNewsData] = useState<NewsItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [likeCount, setLikeCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [commentCount, setCommentCount] = useState(0)

    const handleGetNews = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await appClient.get("/api/news/slug", {
                params: { slug }
            })
            console.log(response)
            if (response.data.status && response.data.existingNews) {
                setNewsData(response.data.existingNews)
                setLikeCount(response.data.existingNews.likesCount || 0)
            } else {
                setError("News article not found")
            }
        } catch (error) {
            console.error("Error fetching news:", error)
            setError("Failed to load news article. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (slug) {
            handleGetNews()
        }
    }, [slug])


    useEffect(() => {
        if (!newsData?._id) return

        // 🔥 Realtime query for comments by newsId
        const q = query(collection(db, "newsComments"), where("newsId", "==", newsData?._id))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: Comment[] = []
            snapshot.forEach((doc) => list.push(doc.data() as Comment))
            // sort by newest
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            setComments(list)
            setCommentCount(list.length)
        })

        return () => unsubscribe()
    }, [newsData])

    const handleCommentAdded = () => {
        // This will trigger a re-render and show the new comment via real-time listener
        console.log("Comment added successfully")
    }

    let anonymousId = localStorage.getItem("anonymousId");
    if (!anonymousId) {
        anonymousId = crypto.randomUUID();
        localStorage.setItem("anonymousId", anonymousId);
    }


    const handleLike = async () => {
        // if (isLiked) {
        //     setLikeCount(prev => prev - 1)
        // } else {
        //     setLikeCount(prev => prev + 1)
        // }
        // setIsLiked(!isLiked)

        try {
            await appClient.post(`/api/like/toggle`, { newsId: newsData?._id, anonymousId })
        } catch (error) {
            console.log("error toggle like news", error)
        } finally {
            console.log("Done")
        }
    }


    useEffect(() => {
        if (!newsData?._id) return

        const newsId = newsData._id
        const ref = doc(db, "newsLike", newsId)

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data()
                setLikeCount(data.likeCount || 0)
            } else {
                setLikeCount(0)
            }
        })

        // Cleanup on unmount
        return () => unsubscribe()
    }, [newsData])


    const handleShare = () => {
        if (newsData) {
            const url = `https://thecoincartel.com/news/${slug}`;
            const shareText = `🚀 Check out this crypto news on The Coin Cartel: ${url}`;
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
                "_blank"
            );
        }
    }

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

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-text-primary/80 animate-spin mx-auto" />
                    <p className="text-gray-400 text-lg">Loading news article...</p>
                </div>
            </div>
        )
    }

    if (error || !newsData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md mx-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <h1 className="text-2xl font-bold text-text-primary">Article Not Found</h1>
                    <p className="text-gray-400">{error || "The news article you're looking for doesn't exist."}</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/news-blogs")}
                            className="flex items-center space-x-2 text-text-primary/50 hover:text-yellow-400 transition-colors mx-auto"
                        >
                            <ArrowLeft size={20} />
                            <span>Go Back</span>
                        </button>
                        <Link
                            href="/news"
                            className="inline-block bg-text-primary/10 text-text-primary/80 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                        >
                            Browse All News
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Back Navigation */}
            <div className="border-b border-text-primary/30 bg-transparent">
                <div className="container mx-auto px-4 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center space-x-2 text-text-primary/80 hover:text-text-primary/ transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to News</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="">
                    {/* Left Column - Main Article */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Article Header */}
                        <article className="bg-transparent rounded-2xl overflow-hidden">
                            {/* Featured Image */}
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <Image
                                    src={newsData.image}
                                    alt={newsData.heading}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                                        {newsData?.category?.name ?? "Crypto"}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {newsData.isFeatured && (
                                    <div className="absolute top-6 right-6">
                                        <span className="bg-red-500 text-text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                            Featured 🔥
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Article Content */}
                            <div className="p-6 md:p-8">
                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-text-primary/80 mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={16} />
                                        <span>{newsData.publishedAt ? formatDate(newsData.publishedAt) : ""}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={16} />
                                        <span>{newsData.publishedAt ? getTimeAgo(newsData.publishedAt) : ""}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <User size={16} />
                                        <span>{newsData.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Eye size={16} />
                                        <span>{(newsData.viewsCount || 0).toLocaleString()} views</span>
                                    </div>
                                </div>

                                {/* Title and Subtitle */}
                                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
                                    {newsData.heading}
                                </h1>
                                <p className="text-xl text-text-primary/60 mb-6 leading-relaxed">
                                    {newsData.subheading}
                                </p>

                                {/* Excerpt */}
                                <div className="bg-text-primary/10 border-l-4 border-text-primary/70 p-4 mb-6">
                                    <p className="text-text-primary/60 italic">{newsData.excerpt}</p>
                                </div>

                                {/* Article Body */}
                                <div
                                    className="prose prose-invert max-w-none text-text-primary/60 leading-relaxed mb-8"
                                    dangerouslySetInnerHTML={{ __html: newsData.description }}
                                />

                                {/* Tags */}
                                {newsData.tags && newsData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {newsData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center space-x-1 bg-text-primary/10 px-3 py-1 rounded-full text-sm text-text-primary/90"
                                            >
                                                <Tag size={14} />
                                                <span>
                                                    {tag.name || (index + 1)}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Interaction Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-text-primary/40">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={handleLike}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isLiked
                                                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                                                : 'bg-text-primary/10 text-text-primary/70 hover:text-pink-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                                            <span>{likeCount}</span>
                                        </button>

                                        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-text-primary/10 text-text-primary/70 cursor-default">
                                            <MessageCircle size={20} />
                                            <span>{commentCount}</span>
                                        </button>

                                        <button
                                            onClick={handleShare}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-text-primary/10 text-text-primary/70 hover:text-green-400 hover:bg-gray-700 transition-all"
                                        >
                                            <Share2 size={20} />
                                            <span>Share</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>Credibility Score:</span>
                                        <span className={`font-semibold ${(newsData.credibilityScore || 0) >= 80 ? 'text-green-400' :
                                            (newsData.credibilityScore || 0) >= 60 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {newsData.credibilityScore || 'N/A'}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Comments Section */}
                        <section className="bg-text-primary/5 rounded-2xl border border-text-primary/20 p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <MessageCircle className="w-6 h-6 text-text-primary/" />
                                <h2 className="text-xl font-bold text-text-primary">Comments ({commentCount})</h2>
                            </div>

                            {/* Comment Input */}
                            <div className="mb-8">
                                <CommentInput
                                    newsId={newsData._id}
                                    onCommentAdded={handleCommentAdded}
                                />
                            </div>

                            {/* Comments List */}
                            <CommentsList comments={comments} />
                        </section>
                    </div>
                </div>

                <div className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-text-primary/5 to-text-primary/10 border-2 border-dashed border-text-primary/20 rounded-2xl p-6 md:p-8 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 mb-4">
                                    <Megaphone className="w-8 h-8 text-text-primary/60" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-2">Advertisement Space</h3>
                                <p className="text-text-primary/60 mb-6">
                                    Premium advertising spot for relevant products and services
                                </p>
                            </div>



                            <div className="text-sm text-text-primary/60">
                                <p className="mb-2">
                                    Interested in advertising with us?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button className="px-6 py-2.5 bg-gradient-to-r from-text-primary/10 to-text-primary/20 text-text-primary/80 rounded-lg font-medium hover:bg-text-primary/30 transition-colors">
                                        Contact Sales
                                    </button>
                                    <button className="px-6 py-2.5 border border-text-primary/30 text-text-primary/80 rounded-lg font-medium hover:bg-text-primary/10 transition-colors">
                                        View Ad Rates
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>

            <style jsx>{`
                .prose {
                    line-height: 1.7;
                }
                .prose p {
                    margin-bottom: 1.5rem;
                }
                .prose strong {
                    color: white;
                    font-weight: 600;
                }
                .prose a {
                    color: #bf953f;
                    text-decoration: underline;
                }
                .prose a:hover {
                    color: #FFD700;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default NewsDetailPage