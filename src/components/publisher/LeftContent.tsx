"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Shield, Users, DollarSign, BarChart, Zap } from "lucide-react"
import FeatureCard from "./FeatureCard"

const LeftContent = () => {
    const leftContentRef = useRef<HTMLDivElement>(null)

    const features = [
        {
            icon: <DollarSign className="w-5 h-5" />,
            title: "Higher Revenue",
            description: "Earn up to 40% more compared to traditional ad networks"
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Brand Safe",
            description: "Only premium, vetted advertisers on our platform"
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Instant Payouts",
            description: "Get paid within 24 hours with multiple payout options"
        },
        {
            icon: <BarChart className="w-5 h-5" />,
            title: "Real-time Analytics",
            description: "Track performance with detailed, real-time dashboards"
        }
    ]

    return (
        <div
            ref={leftContentRef}
            className="lg:w-1/2 lg:pr-8 lg:overflow-y-auto lg:max-h-[calc(100vh-4rem)] lg:pt-4"
        >
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-text-primary/80 space-y-8 lg:space-y-12"
            >
                {/* Hero Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-text-primary/80">
                            Maximize Your Revenue
                        </h1>
                    </div>
                    <p className="text-xl lg:text-2xl font-light text-text-primary/60">
                        High-Performing Publisher Ad Network
                    </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-text-primary/70" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                Our platform gives publishers a safe and transparent way to earn more from their traffic.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-text-primary/70" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                Enjoy perfectly matched ads, instant payouts, and a streamlined setup powered by industry-leading tools.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-text-primary/70" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                Join thousands of successful publishers already maximizing their revenue with our platform.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-text-primary/80">
                        Why Choose Our Network?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                feature={feature}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-text-primary/10">
                    <p className="text-text-primary/60 text-sm">
                        All publishers are protected by our comprehensive fraud detection system
                        and 24/7 customer support. Start earning today!
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default LeftContent