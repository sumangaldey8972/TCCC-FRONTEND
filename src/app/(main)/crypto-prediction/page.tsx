"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import {
    Bitcoin,
    TrendingUp,
    Rocket,
    Sparkles,
    Zap,
    LineChart,
    Brain,
    Shield,
    Target
} from "lucide-react"

const CryptoPredictionPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Simple floating animation for particles
        gsap.to(".particle", {
            y: -20,
            x: "random(-10, 10)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.1
        })

        // 3D rotation for crypto icons
        gsap.to(".crypto-icon", {
            rotationY: 360,
            duration: 8,
            repeat: -1,
            ease: "none"
        })

        // Pulse animation for coming soon text
        gsap.to(".pulse-glow", {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })
    }, [])

    const features = [
        { icon: Brain, title: "AI Predictions", color: "from-purple-500/20 to-pink-500/20" },
        { icon: LineChart, title: "Real-time Data", color: "from-blue-500/20 to-cyan-500/20" },
        { icon: Shield, title: "Risk Analysis", color: "from-emerald-500/20 to-green-500/20" },
        { icon: Target, title: "High Accuracy", color: "from-amber-500/20 to-orange-500/20" },
    ]

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground relative overflow-hidden"
        >
            {/* Background Particles */}
            <div ref={particlesRef} className="absolute inset-0 -z-10">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute w-1 h-1 bg-primary/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Floating Crypto Icons */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <Bitcoin className="crypto-icon absolute top-1/4 left-1/4 w-16 h-16 text-amber-500" />
                <Bitcoin className="crypto-icon absolute bottom-1/4 right-1/4 w-20 h-20 text-purple-500" />
                <Bitcoin className="crypto-icon absolute top-1/3 right-1/3 w-12 h-12 text-blue-500" />
            </div>

            {/* Main Content */}
            <main className="relative z-10">
                <div className="container mx-auto px-4 py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6"
                        >
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">COMING SOON</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            <span className="text-foreground">Crypto</span>
                            <br />
                            <span>
                                Predictions
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        >
                            AI-powered cryptocurrency price predictions and market analysis
                        </motion.p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-background/60 backdrop-blur-sm rounded-xl border border-primary/20 p-6 hover:border-primary/40 transition-all duration-300">
                                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center border border-primary/20 mb-4`}>
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Advanced algorithms for accurate market predictions
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-center mt-12"
                    >
                        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="w-4 h-4" />
                            <span>Powered by advanced machine learning algorithms</span>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Simple CSS for 3D effects */}
            <style jsx global>{`
                .pulse-glow {
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                .crypto-icon {
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotateY(0deg); }
                    50% { transform: translateY(-10px) rotateY(180deg); }
                }
            `}</style>
        </div>
    )
}

export default CryptoPredictionPage