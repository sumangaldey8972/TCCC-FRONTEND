import { motion } from "framer-motion"
import { Cpu, Heart, MessageCircle, Users } from "lucide-react"
import { NewsItem } from "@/type/news.type"

interface InnovationGridProps {
    news: NewsItem[]
    innovationIcons: Array<{ icon: any; color: string }>
    onNewsClick: (item: NewsItem) => void
    getTimeAgo: (date: string) => string
}

const InnovationGrid = ({ news, innovationIcons, onNewsClick, getTimeAgo }: InnovationGridProps) => {
    if (news.length === 0) return null

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg border border-primary/20">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Latest Innovations
                    </h2>
                </div>
                <div className="text-sm text-muted-foreground">
                    {news.length} breakthrough stories
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => {
                    const Icon = innovationIcons[index % innovationIcons.length].icon
                    const color = innovationIcons[index % innovationIcons.length].color

                    return (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => onNewsClick(item)}
                        >
                            <div className="h-full bg-gradient-to-b from-background to-background/50 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
                                <div className="relative p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl border ${color.replace('/20', '/20')}`}>
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {getTimeAgo(item.publishedAt)}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.heading}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {item.subheading}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {item.tags?.slice(0, 2).map(tag => (
                                            <span
                                                key={tag._id}
                                                className="px-2 py-1 bg-primary/10 text-foreground rounded-md text-xs border border-primary/20"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center border border-primary/20">
                                                <Users className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-3 h-3" />
                                                <span>{item.likesCount || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-3 h-3" />
                                                <span>{item.commentsCount || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default InnovationGrid