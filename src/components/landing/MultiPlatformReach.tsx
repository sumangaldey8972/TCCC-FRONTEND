"use client";

import { motion } from "framer-motion";
import {
    FiLinkedin, FiInstagram, FiYoutube,
    FiTwitter, FiMessageSquare, FiBarChart2,
    FiGlobe, FiTrendingUp
} from "react-icons/fi";
import { BsTelegram } from "react-icons/bs";
import { SiBinance, SiCoinmarketcap } from "react-icons/si";
import { useState } from "react";
import { Globe } from "../ui/globe";
import { FaXTwitter } from "react-icons/fa6";
import BackgroundGlobe from "../ui/BackgroundGlobe";

const platforms = [
    // {
    //     name: "LinkedIn",
    //     icon: FiLinkedin,
    //     color: "#0077B5",
    //     description: "Professional Network & B2B Outreach"
    // },
    {
        name: "Binance",
        icon: SiBinance,
        color: "#F0B90B",
        description: "Crypto Exchange & Trading Community"
    },
    {
        name: "Coin Market Cap",
        icon: SiCoinmarketcap,
        color: "#17181B",
        description: "Market Data & Analytics Platform"
    },
    {
        name: "Instagram",
        icon: FiInstagram,
        color: "#E4405F",
        description: "Visual Content & Engagement"
    },
    {
        name: "X (Twitter)",
        icon: FaXTwitter,
        color: "#000000",
        description: "Real-time Updates & Trends"
    },
    {
        name: "Telegram",
        icon: BsTelegram,
        color: "#26A5E4",
        description: "Community Building & Messaging"
    },
    {
        name: "YouTube",
        icon: FiYoutube,
        color: "#FF0000",
        description: "Video Content & Tutorials"
    },
];

export default function MultiPlatformReach() {
    const [hoveredPlatform, setHoveredPlatform] = useState("");

    return (
        <section className="relative bg-background py-4 sm:py-24 overflow-hidden">
            <BackgroundGlobe />


            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-0">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-16 mt-16"
                >

                    <h2 className="text-sm md:text-4xl font-bold tracking-tight">
                        Promote Your Brand Across{" "}
                        <span className="relative">
                            <span className="">
                                Multiple Platforms
                            </span>
                        </span>
                    </h2>

                    <p className="mt-2 md:mt-6 text-xxs md:text-lg text-text-primary/70 max-w-3xl mx-auto leading-relaxed">
                        One campaign. Multiple platforms. Complete control. Reach crypto-native users,
                        investors, builders, and mainstream audiences through a single unified distribution system.
                    </p>
                </motion.div>

                {/* Enhanced Platforms Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-6 relative">
                    {platforms.map((platform, index) => {
                        const Icon = platform.icon;
                        const isHovered = hoveredPlatform === platform.name;

                        return (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.07,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                onMouseEnter={() => setHoveredPlatform(platform.name)}
                                onMouseLeave={() => setHoveredPlatform("")}
                                className={`
                relative rounded-md md:rounded-2xl border border-text-primary/20
                bg-gradient-to-br from-white/5 to-white/[0.02]
                backdrop-blur-sm backdrop-saturate-50
                p-2 md:p-5 text-center group
                hover:border-text-primary/40 hover:shadow-2xl
                transition-all duration-300 overflow-hidden
                ${isHovered ? 'ring-2 ring-text-primary/20' : ''}
                shadow-lg shadow-black/10
            `}
                            >
                                {/* Platform Icon with Background */}
                                <div
                                    className="inline-flex items-center justify-center w-6 h-6 md:w-14 md:h-14 rounded-md md:rounded-xl mb-4"
                                    style={{
                                        backgroundColor: `${platform.color}20`,
                                        border: `2px solid ${platform.color}30`,
                                        backdropFilter: 'blur(4px)'
                                    }}
                                >
                                    <Icon
                                        className="w-3 h-3 md:w-7 md:h-7"
                                        style={{ color: platform.color }}
                                    />
                                </div>

                                {/* Platform Name */}
                                <h3 className="font-semibold text-xs md:text-sm mb-2 text-text-primary relative z-10">
                                    {platform.name}
                                </h3>

                                {/* Description */}
                                <p className="text-xxs md:text-xs text-text-primary/80 leading-tight relative z-10">
                                    {platform.description}
                                </p>

                                {/* Hover Indicator */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        scale: isHovered ? 1 : 0.8
                                    }}
                                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                                >
                                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" />
                                </motion.div>

                                {/* Animated Background on Hover - Enhanced for glass effect */}
                                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `radial-gradient(circle at center, ${platform.color}15 0%, transparent 70%)`,
                                            backdropFilter: 'blur(20px)'
                                        }}
                                    />
                                </div>

                                {/* Subtle inner glow for depth */}
                                <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Platform Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="
               text-center transition-all duration-300 mt-4 md:mt-16
            "
                >
                    <div className="max-w-2xl mx-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="
                  inline-flex items-center gap-2
                  bg-text-primary
                  text-background font-semibold px-4 md:px-6 py-2 md:py-3 rounded-xl
                  hover:shadow-lg hover:shadow-yellow-500/25
                  transition-all duration-300 text-sm md:text-lg
                "
                            onClick={() => window.location.replace("/")}
                        >
                            <FiBarChart2 className="w-3 h-3 md:w-5 md:h-5" />
                            Coming Soon
                        </motion.button>
                    </div>
                </motion.div>

                {/* Enhanced Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-4 md:mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight">
                        <span className="text-xs text-text-primary/60">Launch once.</span>
                        <span className="text-sm text-text-primary/80 flex items-center gap-2">
                            <FiGlobe className="w-3 h-3 md:w-6 md:h-6" />
                            Dominate everywhere.
                        </span>
                    </div>

                    {/* Animated underline */}
                    <div className="relative inline-block mt-4">
                        <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                        <div className="absolute -bottom-2 left-0 w-8 h-1 bg-yellow-500 rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}