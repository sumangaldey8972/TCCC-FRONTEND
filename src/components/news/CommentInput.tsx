"use client"

import { useState } from "react"
import { Send, User, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/config/firebaseConfig"
import appClient from "@/lib/appClient"

interface CommentInputProps {
    newsId: string
    onCommentAdded: () => void;
    compact?: boolean
}

const CommentInput = ({ newsId, onCommentAdded }: CommentInputProps) => {
    const [commentText, setCommentText] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const generateAnonymousId = () => {
        let anonymousId = localStorage.getItem("anonymousId")
        if (!anonymousId) {
            anonymousId = `an-${Math.floor(Math.random() * 1000)}#${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            localStorage.setItem("anonymousId", anonymousId)
        }
        return anonymousId
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim() || submitting) return

        setSubmitting(true)
        const anonymousId = generateAnonymousId()
        try {
            console.log({ newsId, anonymousId, commentText })
            const payload = {
                newsId,
                anonymousId,
                commentText
            }

            const response = await appClient.post("/api/comment/submit", payload)

            if (response.data.status) {
                setCommentText("")
                onCommentAdded()
            }

        } catch (error) {
            console.error("Error adding comment:", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-text-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-text-primary/80" />
                </div>
                <div className="flex-1">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/10 rounded-xl text-text-primary placeholder-text-primary/70 focus:outline-none focus:border-text-primary/50 transition-colors resize-none"
                        rows={3}
                        maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${commentText.length > 400 ? 'text-red-400' : 'text-text-primary/60'}`}>
                            {commentText.length}/500
                        </span>
                        <motion.button
                            type="submit"
                            disabled={!commentText.trim() || submitting}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${!commentText.trim() || submitting
                                ? 'bg-text-primary/20 text-text-primary/40 cursor-not-allowed'
                                : 'bg-text-primary/80 text-background hover:bg-text-primary/80 hover:shadow-lg hover:shadow-text-primary/25'
                                }`}
                            whileHover={!commentText.trim() || submitting ? {} : { scale: 1.05 }}
                            whileTap={!commentText.trim() || submitting ? {} : { scale: 0.95 }}
                        >
                            {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send size={16} />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CommentInput