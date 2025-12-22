"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const timeline = [
    {
        year: "2023",
        title: "The Idea",
        desc: "A vision to fix fragmented crypto marketing and news distribution.",
    },
    {
        year: "2024",
        title: "Foundation Built",
        desc: "Infrastructure for publishers, advertisers, and Web3 brands.",
    },
    {
        year: "2025",
        title: "The Cartel Launch",
        desc: "Unified ecosystem for news, ads, tokens, NFTs, and growth.",
    },
];

const buildItems = [
    "Crypto & Web3 news distribution",
    "Token & NFT promotion",
    "Publisher listing & monetization",
    "Self-serve ad campaigns",
    "Multi-platform brand exposure",
    "Transparent analytics & tracking",
];

export default function AboutUs() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            className="min-h-screen bg-background text-text-primary overflow-hidden relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={containerRef}
        >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] opacity-30" />

            {/* Animated Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Moving Orbs */}
                <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] animate-orb-slow">
                    <div className="w-full h-full bg-gradient-to-br from-text-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
                </div>
                <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] animate-orb-medium">
                    <div className="w-full h-full bg-gradient-to-tl from-text-primary/3 via-transparent to-transparent rounded-full blur-3xl" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] animate-orb-fast">
                    <div className="w-full h-full bg-gradient-to-r from-text-primary/4 via-transparent to-transparent rounded-full blur-3xl" />
                </div>
            </div>

            {/* Dynamic Light Grid */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)]" />
                <div
                    className="absolute inset-0 opacity-30 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(4, 7, 32, 0.1), transparent 40%)`,
                    }}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-text-primary/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 + 'vw',
                            y: Math.random() * 100 + 'vh',
                        }}
                        animate={{
                            x: [null, `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)`],
                            y: [null, `calc(${Math.random() * 100}vh + ${Math.cos(i) * 50}px)`],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Animated Border Beams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-text-primary/30 to-transparent"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '200% 100%',
                    }}
                />
                <motion.div
                    className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-text-primary/30 to-transparent"
                    animate={{
                        backgroundPosition: ['0% 0%', '0% 100%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                    }}
                    style={{
                        backgroundSize: '100% 200%',
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-text-primary/30 to-transparent"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                    }}
                    style={{
                        backgroundSize: '200% 100%',
                    }}
                />
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-t from-transparent via-text-primary/30 to-transparent"
                    animate={{
                        backgroundPosition: ['0% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                    }}
                    style={{
                        backgroundSize: '100% 200%',
                    }}
                />
            </div>

            {/* Spotlight Effect Container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x - 300,
                        y: mousePosition.y - 300,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 0.5
                    }}
                    style={{
                        background: `radial-gradient(circle, rgba(4, 7, 32, 0.08) 0%, transparent 70%)`,
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-16 space-y-20">
                {/* HERO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto pt-10"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-text-primary/10 via-text-primary/5 to-text-primary/10 blur opacity-75 group-hover:opacity-100 transition duration-1000" />
                            <h1 className="relative text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary to-text-primary/80 px-6 py-2">
                                About The Cartel
                            </h1>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-6 text-lg text-text-primary/70 leading-relaxed"
                    >
                        A unified growth engine for crypto, digital marketing, news,
                        tokens, NFTs, publishers, and campaigns.
                    </motion.p>
                </motion.div>

                {/* MANIFESTO WITH SPOTLIGHT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative max-w-4xl mx-auto text-center p-8 rounded-2xl backdrop-blur-sm bg-bg-secondary/50 border border-text-primary/10 group"
                >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/5 via-transparent to-text-primary/5 animate-gradient-x" />
                    </div>

                    {/* Spotlight effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                            style={{
                                transform: 'skewX(-15deg)',
                            }}
                        />
                    </div>

                    <p className="text-2xl md:text-3xl font-semibold leading-snug relative z-10">
                        We don't chase attention.
                        <motion.span
                            className="block mt-2 bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary/80 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            style={{
                                backgroundSize: '200% 100%',
                            }}
                        >
                            We build systems that control it.
                        </motion.span>
                    </p>
                </motion.div>

                {/* MISSION & VISION */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                            <p className="text-text-primary/70 leading-relaxed">
                                The Cartel exists to revolutionize how brands, builders,
                                publishers, and communities grow in Web2 and Web3.
                                We eliminate friction, middlemen, and noise —
                                replacing them with transparency, control, and scale.
                            </p>
                        </div>

                        <motion.div
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 40px rgba(4, 7, 32, 0.1)"
                            }}
                            className="p-6 rounded-xl border border-text-primary/10 bg-bg-secondary/30 backdrop-blur-sm hover:bg-bg-secondary/50 transition-all duration-300"
                        >
                            <p className="text-sm text-text-primary/60 leading-relaxed">
                                From news distribution to NFT exposure,
                                from publisher monetization to campaign execution —
                                The Cartel is the command center for modern digital growth.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="relative p-8 rounded-2xl border border-text-primary/10 bg-bg-secondary/50 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(4,7,32,0.2)_1px,transparent_0)] bg-[length:20px_20px]" />
                        </div>

                        <h3 className="text-xl font-semibold mb-4 relative z-10">What We're Building</h3>
                        <div className="space-y-3 relative z-10">
                            {buildItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-secondary transition-all duration-200 group/item"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="w-2 h-2 rounded-full bg-text-primary/40"
                                    />
                                    <span className="text-sm text-text-primary/80 group-hover/item:text-text-primary transition-colors duration-200">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* TIMELINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-center mb-10">
                        From Idea to Ecosystem
                    </h2>

                    <div className="relative">
                        {/* Animated timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 overflow-hidden">
                            <motion.div
                                className="w-full h-full bg-gradient-to-b from-text-primary/20 via-text-primary/40 to-text-primary/20"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                viewport={{ once: true }}
                                style={{ originY: 0 }}
                            />
                        </div>

                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 8 }}
                                    className="relative flex gap-6 items-start pl-12 group"
                                >
                                    {/* Animated timeline dot */}
                                    <motion.div
                                        className="absolute left-6 top-2 w-4 h-4 rounded-full bg-bg-secondary border-2 border-text-primary/40 group-hover:border-text-primary/60 transition-colors duration-300"
                                        whileHover={{ scale: 1.2 }}
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 0 rgba(4, 7, 32, 0)",
                                                "0 0 0 6px rgba(4, 7, 32, 0.1)",
                                                "0 0 0 0 rgba(4, 7, 32, 0)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.5,
                                        }}
                                    />

                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="font-bold text-text-primary/90">
                                                {item.year}
                                            </span>
                                            <motion.div
                                                className="h-px flex-1 bg-gradient-to-r from-text-primary/20 to-transparent"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                                        <p className="text-sm text-text-primary/60">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* FOUNDERS - PROFESSIONAL DESIGN */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-3">Founders</h2>
                        <p className="text-text-primary/60 text-sm max-w-2xl mx-auto">
                            Visionary leaders driving the future of digital marketing and Web3 innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Sam",
                                role: "Executive & Founder",
                                desc: "Growth strategist focused on digital marketing systems, scalable advertising, and brand expansion across Web2 and Web3 ecosystems.",
                                expertise: ["Digital Marketing", "Scalable Systems", "Brand Growth"],
                                initials: "AS",
                                color: "from-blue-500/10 to-purple-500/10",
                            },
                            {
                                name: "Raghavendra Pratap Singh",
                                role: "Founder",
                                desc: "Web3 innovator driving crypto, tokens, NFTs, publishers, and decentralized ecosystems with technical excellence.",
                                expertise: ["Blockchain", "Tokenomics", "DeFi", "NFT Ecosystems"],
                                initials: "RS",
                                color: "from-green-500/10 to-cyan-500/10",
                            },
                        ].map((founder, index) => (
                            <motion.div
                                key={founder.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="group relative overflow-hidden rounded-2xl border border-text-primary/10 bg-bg-secondary/30 backdrop-blur-sm p-8 transition-all duration-500 hover:shadow-2xl"
                            >
                                {/* Animated gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${founder.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                {/* Animated Border */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-text-primary/20 transition-all duration-500" />

                                {/* Floating effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.5,
                                    }}
                                />

                                <div className="relative">
                                    {/* Profile Header */}
                                    <div className="flex items-start gap-6 mb-6">
                                        {/* Professional Avatar with shine effect */}
                                        <div className="relative">
                                            <motion.div
                                                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-text-primary/20 to-text-primary/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                animate={{
                                                    rotate: 360,
                                                }}
                                                transition={{
                                                    duration: 20,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-text-primary/10 to-text-primary/5 border border-text-primary/10 flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-2xl font-bold text-text-primary/70">
                                                    {founder.initials}
                                                </span>
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-bg-secondary border border-text-primary/10 flex items-center justify-center backdrop-blur-sm">
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-text-primary/40"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-text-primary">
                                                {founder.name}
                                            </h3>
                                            <p className="text-sm text-text-primary/60 mt-1">
                                                {founder.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-text-primary/70 text-sm leading-relaxed mb-6">
                                        {founder.desc}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {founder.expertise.map((skill, idx) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ scale: 1.05 }}
                                                className="px-3 py-1 text-xs rounded-full border border-text-primary/10 bg-bg-secondary/50 text-text-primary/70 backdrop-blur-sm hover:bg-bg-secondary transition-all duration-200"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Connect Link */}
                                    <div className="mt-6 pt-6 border-t border-text-primary/10">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-sm text-text-primary/60 hover:text-text-primary transition-colors duration-200 flex items-center gap-2 group/btn"
                                        >
                                            <span>Connect</span>
                                            <motion.svg
                                                className="w-4 h-4"
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </motion.svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* PRESS & PARTNERSHIPS */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-3xl mx-auto text-center border-t border-text-primary/10 pt-12"
                >
                    <h3 className="text-xl font-semibold mb-4">
                        Press & Partnerships
                    </h3>
                    <p className="text-text-primary/60 text-sm leading-relaxed">
                        The Cartel is a digital growth ecosystem enabling crypto brands,
                        publishers, and communities to launch campaigns, distribute news,
                        and scale transparently across platforms.
                    </p>

                    <div className="mt-8 flex justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 rounded-lg border border-text-primary/10 bg-bg-secondary/50 text-text-primary text-sm hover:bg-bg-secondary transition-all duration-200 backdrop-blur-sm"
                        >
                            Download Press Kit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 rounded-lg bg-text-primary text-white text-sm hover:bg-text-primary/90 transition-all duration-200"
                        >
                            Contact Partnerships
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
        @keyframes orb-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(90deg); }
          50% { transform: translate(-15px, 20px) rotate(180deg); }
          75% { transform: translate(30px, 15px) rotate(270deg); }
        }
        
        @keyframes orb-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 25px) rotate(120deg); }
          66% { transform: translate(20px, -20px) rotate(240deg); }
        }
        
        @keyframes orb-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-orb-slow {
          animation: orb-slow 30s ease-in-out infinite;
        }

        .animate-orb-medium {
          animation: orb-medium 20s ease-in-out infinite;
        }

        .animate-orb-fast {
          animation: orb-fast 15s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
        </section>
    );
}