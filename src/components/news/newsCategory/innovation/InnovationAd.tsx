import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Rocket, Shield, Target, TrendingUp, Megaphone, Sparkles, Zap } from "lucide-react"

const InnovationAd = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

    // Floating animation variants
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    const rotateAnimation = {
        rotateY: [0, 360],
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 relative"
            style={{ opacity }}
        >
            {/* 3D Background Elements */}
            <motion.div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{ y }}
            >
                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/20 rounded-full"
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                            }}
                            animate={{
                                x: [null, Math.random() * 100 + "%"],
                                y: [null, Math.random() * 100 + "%"],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Main Content Container */}
            <motion.div
                className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl"
                whileHover={{ scale: 1.005 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 3D Depth Effect */}

                <div className="relative p-8 md:p-10 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Animated Header */}
                        <motion.div
                            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full border border-primary/40 mb-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        // animate={pulseAnimation}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            >
                                <Megaphone className="w-5 h-5 text-primary" />
                            </motion.div>
                            <span className="text-sm font-medium text-foreground tracking-wider">
                                ADVERTISING SPACE
                            </span>
                        </motion.div>

                        {/* 3D Title */}
                        <motion.h3
                            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                            style={{
                                textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6 }}
                        >
                            Connect with the{" "}
                            <motion.span
                                className="text-primary relative inline-block"
                                animate={{
                                    textShadow: [
                                        "0 0 8px rgba(99, 102, 241, 0.5)",
                                        "0 0 16px rgba(99, 102, 241, 0.8)",
                                        "0 0 8px rgba(99, 102, 241, 0.5)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Future Builders
                            </motion.span>
                        </motion.h3>

                        <motion.p
                            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Reach innovators, developers, and Web3 enthusiasts who are shaping tomorrow's technology.
                        </motion.p>

                        {/* 3D Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative">
                            {/* Background Glow Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 blur-2xl"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            {[
                                {
                                    icon: Target,
                                    title: "Targeted Reach",
                                    description: "Connect with early adopters",
                                    color: "from-blue-500/20 to-cyan-500/20"
                                },
                                {
                                    icon: TrendingUp,
                                    title: "High Engagement",
                                    description: "Active tech community",
                                    color: "from-green-500/20 to-emerald-500/20"
                                },
                                {
                                    icon: Shield,
                                    title: "Trusted Platform",
                                    description: "Verified innovation content",
                                    color: "from-purple-500/20 to-pink-500/20"
                                }
                            ].map((card, index) => (
                                <motion.div
                                    key={index}
                                    className="relative group"
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                // transition={{ delay: index * 0.1 }}
                                >
                                    {/* 3D Card Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                        style={{
                                            background: `linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))`,
                                            filter: "blur(10px)",
                                            transform: "translateZ(20px)"
                                        }}
                                    />

                                    <div className="relative p-6 bg-gradient-to-br from-background/80 to-background/60 rounded-xl border-2 border-primary/20 shadow-xl backdrop-blur-sm group-hover:border-primary/40 transition-all duration-300">
                                        <motion.div
                                            className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg flex items-center justify-center border border-primary/30"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        // animate={floatingAnimation}
                                        >
                                            <card.icon className="w-6 h-6 text-primary" />
                                        </motion.div>
                                        <h4 className="text-lg font-semibold text-foreground mb-2">
                                            {card.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {card.description}
                                        </p>

                                        {/* Hover Indicator */}
                                        <motion.div
                                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "40%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 3D CTA Section */}
                        {/* <motion.div
                            className="relative p-6 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-xl border-2 border-primary/30 overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute inset-0 opacity-10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                style={{
                                    background: `conic-gradient(from 0deg at 50% 50%, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(99, 102, 241, 0.2))`
                                }}
                            />

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center border-2 border-primary/40"
                                        // animate  ={rotateAnimation}
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Rocket className="w-8 h-8 text-primary" />
                                    </motion.div>
                                    <div className="text-left">
                                        <div className="text-lg font-bold text-foreground">
                                            Your Innovation Here
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Launch your product to the right audience
                                        </div>
                                    </div>
                                </div>
                                <motion.button
                                    className="relative px-8 py-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white font-semibold rounded-lg overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.2)" }}
                                    animate={{
                                        boxShadow: [
                                            "0 4px 14px 0 rgba(99, 102, 241, 0.2)",
                                            "0 6px 20px 0 rgba(99, 102, 241, 0.4)",
                                            "0 4px 14px 0 rgba(99, 102, 241, 0.2)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                                        animate={{
                                            x: ["-100%", "200%", "-100%"]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    <span className="relative z-10">Learn More</span>
                                </motion.button>
                            </div>
                        </motion.div> */}
                    </div>
                </div>
            </motion.div>

            {/* Floating Indicators */}
            <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
        </motion.div>
    )
}

export default InnovationAd