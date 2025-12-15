import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
    Rocket,
    Shield,
    Users,
    Network,
    CpuIcon,
    Globe,
    BrainCircuit,
    TrendingUp,
    Sparkles,
    Zap,
    Cpu,
    Code,
    Cloud,
    Brain,
    CircuitBoard,
    Target,
    BarChart3
} from "lucide-react"

interface InnovationHeaderProps {
    news: any[]
    getTimeAgo: (date: string) => string
}

const InnovationHeader = ({ news, getTimeAgo }: InnovationHeaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    // Spring animations for smoothness
    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
    const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })

    // Floating particles state
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number }>>([])

    // Initialize particles
    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            speed: Math.random() * 0.5 + 0.2
        }))
        setParticles(newParticles)
    }, [])

    // 3D Tech Icons for floating animation
    const techIcons = [
        { icon: Cpu, color: "text-blue-500", size: 20 },
        { icon: Code, color: "text-emerald-500", size: 18 },
        { icon: Cloud, color: "text-sky-500", size: 22 },
        { icon: Brain, color: "text-purple-500", size: 19 },
        { icon: CircuitBoard, color: "text-cyan-500", size: 21 },
        { icon: Target, color: "text-rose-500", size: 17 },
        { icon: BarChart3, color: "text-amber-500", size: 20 },
        { icon: Shield, color: "text-green-500", size: 18 },
    ]

    // Floating animation variants
    const floatingAnimation = {
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
        transition: {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    const rotate3D = {
        rotateY: [0, 180, 360],
        rotateX: [0, 20, 0],
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }

    const pulseGlow = {
        scale: [1, 1.1, 1],
        boxShadow: [
            "0 0 20px rgba(99, 102, 241, 0.1)",
            "0 0 40px rgba(99, 102, 241, 0.3)",
            "0 0 20px rgba(99, 102, 241, 0.1)"
        ],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    return (
        <motion.header
            ref={containerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden min-h-[600px] bg-gradient-to-br from-primary/10 via-background to-background"
            style={{ scale }}
        >
            {/* 3D Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layered Parallax Backgrounds */}
                <motion.div
                    className="absolute inset-0"
                    style={{ y: springY1 }}
                >
                    {/* Animated Grid with 3D Perspective */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(90deg, rgba(99, 102, 241, 0.05) 2px, transparent 2px),
                                linear-gradient(rgba(99, 102, 241, 0.05) 2px, transparent 2px)
                            `,
                            backgroundSize: '50px 50px',
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                        }}
                    />
                </motion.div>

                {/* Animated Wave Pattern */}
                <motion.div
                    className="absolute inset-0"
                    style={{ y: springY2 }}
                >
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.05)" />
                                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d="M0,100 Q 200,50 400,100 T 800,100 T 1200,100 V 200 H 0 Z"
                            fill="url(#waveGradient)"
                            animate={{
                                d: [
                                    "M0,100 Q 200,50 400,100 T 800,100 T 1200,100 V 200 H 0 Z",
                                    "M0,100 Q 200,150 400,100 T 800,100 T 1200,100 V 200 H 0 Z",
                                    "M0,100 Q 200,50 400,100 T 800,100 T 1200,100 V 200 H 0 Z"
                                ]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </svg>
                </motion.div>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                            }}
                            animate={{
                                y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
                                x: [`${particle.x}%`, `${particle.x + Math.sin(particle.id) * 10}%`, `${particle.x}%`],
                            }}
                            transition={{
                                duration: particle.speed * 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute inset-0">
                    {techIcons.map((tech, index) => {
                        const Icon = tech.icon
                        return (
                            <motion.div
                                key={index}
                                className="absolute"
                                style={{
                                    left: `${10 + (index * 12)}%`,
                                    top: `${20 + (Math.sin(index) * 30)}%`,
                                }}
                                animate={{
                                    y: [0, -100, 0],
                                    rotateY: [0, 180, 360],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{
                                    duration: 15 + index * 2,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                    ease: "linear"
                                }}
                            >
                                <Icon className={`w-${tech.size} h-${tech.size} ${tech.color}`} />
                            </motion.div>
                        )
                    })}
                </div>

                {/* 3D Orb Effects */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                        filter: 'blur(10px)'
                    }}
                // animate={rotate3D}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                // animate={{
                //     ...rotate3D,
                //     transition: { ...rotate3D.transition, duration: 25 }
                // }}
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-2 py-6 md:px-4 md:py-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            {/* Animated Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center gap-3 px-2 py-1 md:px-4 md:py-2 bg-background/80 backdrop-blur-xl rounded-full border-2 border-primary/30 shadow-2xl mb-6 group hover:border-primary/50 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                    <Rocket className="w-3 h-3 md:w-5 md:h-5 text-primary" />
                                </motion.div>
                                <span className="text-xs md:text-sm font-bold text-foreground tracking-wider">
                                    INNOVATION HUB
                                </span>
                            </motion.div>

                            {/* Animated Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="text-2xl md:text-6xl font-bold mb-2 md:mb-6 leading-tight">
                                    <motion.span
                                        className="text-foreground block"
                                        animate={{ textShadow: ["0 0 20px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.3)", "0 0 20px rgba(255,255,255,0)"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        Cutting-Edge
                                    </motion.span>
                                    <motion.span
                                        className="text-primary block bg-gradient-to-r from-primary via-gray-600 to-gray-600 bg-clip-text text-transparent"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    >
                                        Technology News
                                    </motion.span>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xs md:text-lg text-muted-foreground mb-8 max-w-2xl"
                                >
                                    Where Web3, decentralization, and cutting-edge innovation converge.
                                    Trustable, transparent, and transformative news from the forefront of technology.
                                </motion.p>
                            </motion.div>

                            {/* Animated Tags */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-3"
                            >
                                {[
                                    { icon: Shield, text: "Trust & Transparency", color: "emerald" },
                                    { icon: Users, text: "Community Driven", color: "purple" },
                                    { icon: Network, text: "Decentralized", color: "blue" },
                                ].map((tag, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-center gap-2 px-2 py-[4px] md:px-4 md:py-3 bg-background/80 backdrop-blur-sm rounded-md md:rounded-xl border-1 md:border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                        whileHover={{ y: -5, scale: 1.05 }}
                                    >
                                        <motion.div
                                            className={`p-1 md:p-2 rounded-lg bg-${tag.color}-500/10 border border-${tag.color}-500/20`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <tag.icon className={`w-2 h-2 md:w-4 md:h-4 text-${tag.color}-600`} />
                                        </motion.div>
                                        <span className="text-xxs md:text-sm font-medium text-foreground">{tag.text}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Animated Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                            className="lg:w-1/3"
                            style={{ perspective: "1000px" }}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.02, rotateY: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Card Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
                                // animate={pulseGlow}
                                />

                                {/* Card Content */}
                                <div className="relative bg-gradient-to-br from-background/90 via-background/80 to-background/90 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
                                    {/* Animated Background Pattern */}
                                    <motion.div
                                        className="absolute inset-0 opacity-10"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            background: `conic-gradient(from 0deg at 50% 50%, 
                                                rgba(99, 102, 241, 0.3), 
                                                rgba(168, 85, 247, 0.2), 
                                                rgba(236, 72, 153, 0.1), 
                                                rgba(99, 102, 241, 0.3))`
                                        }}
                                    />

                                    <div className="relative z-10 text-center mb-6">
                                        <motion.div
                                            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30 shadow-lg"
                                        // animate={floatingAnimation}
                                        >
                                            <BrainCircuit className="w-10 h-10 text-primary" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            Innovation Pulse
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Real-time insights from the tech frontier
                                        </p>
                                    </div>

                                    <div className="space-y-3 relative z-10">
                                        {[
                                            { icon: Network, label: "Blockchain", count: "42", color: "purple" },
                                            { icon: CpuIcon, label: "AI/ML", count: "28", color: "blue" },
                                            { icon: Globe, label: "Web3", count: "35", color: "emerald" },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                                className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className={`w-10 h-10 bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 rounded-lg flex items-center justify-center border border-${stat.color}-500/20 group-hover:border-${stat.color}-500/40 transition-all`}
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.6 }}
                                                    >
                                                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                                                    </motion.div>
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground">{stat.label}</div>
                                                        <div className="text-xs text-muted-foreground">{stat.count} Articles</div>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                >
                                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Animated Corner Accents */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/30"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
                        <motion.div
                            className="w-1 h-2 bg-primary rounded-full"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.header>
    )
}

export default InnovationHeader