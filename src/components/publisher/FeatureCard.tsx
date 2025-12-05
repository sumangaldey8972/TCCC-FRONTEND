"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FeatureCardProps {
    feature: {
        icon: ReactNode
        title: string
        description: string
    }
    index: number
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-background border border-text-primary/10 rounded-xl hover:border-text-primary/20 transition-colors"
        >
            <div className="flex items-start gap-3">
                <div className="p-2 bg-text-primary/10 rounded-lg">
                    {feature.icon}
                </div>
                <div>
                    <h4 className="font-semibold text-text-primary/80 mb-1">
                        {feature.title}
                    </h4>
                    <p className="text-sm text-text-primary/60">
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default FeatureCard