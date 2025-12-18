"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Target,
    CheckCircle,
    Shield,
    Megaphone,
    Users2,
    ChartBar,
    Lightbulb
} from "lucide-react";

export default function CommunityComingSoon() {
    const [email, setEmail] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);


    // Animated network connections
    useEffect(() => {
        if (!containerRef.current) return;

        const createConnection = () => {
            const connection = document.createElement("div");
            connection.className = "absolute pointer-events-none";

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = Math.random() * 100;
            const endY = Math.random() * 100;
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 2;

            connection.style.left = `${startX}%`;
            connection.style.top = `${startY}%`;
            connection.style.width = `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}vw`;
            connection.style.height = "1px";
            connection.style.backgroundColor = "var(--text-primary)";
            connection.style.opacity = "0.1";
            connection.style.transformOrigin = "left center";
            connection.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;

            connection.style.animation = `pulseConnection ${duration}s ease-in-out ${delay}s infinite`;

            containerRef.current?.appendChild(connection);

            setTimeout(() => {
                if (connection.parentNode) {
                    connection.remove();
                }
            }, duration * 1000);
        };

        // Create initial connections
        for (let i = 0; i < 15; i++) {
            createConnection();
        }

        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                createConnection();
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Target className="w-5 h-5" />,
            title: "Targeted Crypto Exposure",
            description: "Get seen by real traders, investors, and Web3 enthusiasts"
        },
        {
            icon: <Megaphone className="w-5 h-5" />,
            title: "High-Impact Promotion",
            description: "Banner campaigns to influencer boosts tailored to your needs"
        },
        {
            icon: <Users2 className="w-5 h-5" />,
            title: "Community That Moves Markets",
            description: "Join a network of crypto builders and early adopters"
        },
        {
            icon: <Lightbulb className="w-5 h-5" />,
            title: "Growth Strategies That Work",
            description: "Insights, analytics, and optimized campaigns"
        },
        {
            icon: <ChartBar className="w-5 h-5" />,
            title: "Data-Driven Results",
            description: "Trackable conversions and real growth metrics"
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Trusted Environment",
            description: "Quality projects, premium placements"
        },
    ];

    const useCases = [
        "Launching a fresh token",
        "Expanding an existing ecosystem",
        "Marketing a DApp or NFT collection",
        "Building blockchain products",
        "Growing DeFi protocols",
        "Establishing brand authority"
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary relative overflow-hidden" ref={containerRef}>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Network background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />

                {/* Animated glow orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-text-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-text-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.1, 0.25, 0.1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-text-primary/5 border border-text-primary/10 rounded-full mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Rocket className="w-4 h-4 text-text-primary/70" />
                            <span className="text-sm font-medium text-text-primary/70">Launching Soon</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            <span className="block">The Cartel</span>
                            <span className="block text-text-primary/80">Community</span>
                        </h1>

                        <p className="text-xl text-text-primary/70 max-w-3xl mx-auto leading-relaxed">
                            Where Crypto Projects Go From Unknown to Unstoppable
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">
                            Why The Cartel Community?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-background border border-text-primary/10 rounded-xl p-6 hover:border-text-primary/20 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-text-primary/5">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-text-primary mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-text-primary/60">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Use Cases */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-16"
                    >
                        <div className="bg-gradient-to-r from-text-primary/5 to-text-primary/10 border border-text-primary/10 rounded-2xl p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                                    Built for Every Stage of Your Journey
                                </h2>
                                <p className="text-text-primary/70 max-w-2xl mx-auto">
                                    Whether you&apos;re launching fresh or scaling existing, we help you rise above the noise.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {useCases.map((useCase, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-text-primary/5"
                                    >
                                        <CheckCircle className="w-5 h-5 text-text-primary flex-shrink-0" />
                                        <span className="text-text-primary/80">{useCase}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>


                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes pulseConnection {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
        </div>
    );
}