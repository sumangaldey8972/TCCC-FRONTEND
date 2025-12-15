"use client"

import { MessageCircle, User } from "lucide-react"
import { motion } from "framer-motion"

export interface Comment {
    likes: number
    text: string
    name: string
    commentId: string
    commentText: string
    anonymousId?: string
    userId?: string
    createdAt: string
    parentCommentId?: string | null
    likesCount?: number
}

interface CommentsListProps {
    comments: Comment[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
        const diffInHours = Math.floor(diffInMinutes / 60)
        const diffInDays = Math.floor(diffInHours / 24)

        if (diffInMinutes < 1) return 'Just now'
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInDays < 7) return `${diffInDays}d ago`

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getAnonymousName = (anonymousId: string) => {
        const hash = anonymousId.split('-')[1]?.split('#')[0] || '000'
        return `Anonymous${parseInt(hash) % 1000}`
    }

    if (comments.length === 0) {
        return (
            <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No comments yet</p>
                <p className="text-gray-500 text-sm mt-2">
                    Be the first to share your thoughts!
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => (
                <motion.div
                    key={comment.commentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-text-primary/5 border border-text-primary/10 rounded-xl p-4"
                >
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-text-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User size={16} className="text-text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-text-primary/60 font-semibold text-sm">
                                    {comment.anonymousId
                                        ? getAnonymousName(comment.anonymousId)
                                        : 'Anonymous'
                                    }
                                </span>
                                <span className="text-text-primary/60 text-xs">•</span>
                                <span className="text-text-primary/60 text-xs">
                                    {getTimeAgo(comment.createdAt)}
                                </span>
                            </div>
                            <p className="text-text-primary/80 text-sm leading-relaxed">
                                {comment.commentText}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default CommentsList