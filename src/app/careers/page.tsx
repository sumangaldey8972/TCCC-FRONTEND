"use client";

import { motion } from "framer-motion";
import { Briefcase, Sparkles, Rocket, Target, Zap, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function CareersComingSoon() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen bg-background text-text-primary overflow-hidden relative flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-20" />

            {/* Dynamic Gradient Spots */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(4, 7, 32, 0.15), transparent 40%)`,
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        background: "radial-gradient(circle, rgba(4, 7, 32, 0.05) 0%, transparent 70%)",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    style={{
                        background: "radial-gradient(circle, rgba(4, 7, 32, 0.03) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Animated Border Beams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-text-primary/20 to-transparent"
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
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-text-primary/20 to-transparent"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                    }}
                    style={{
                        backgroundSize: '200% 100%',
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative max-w-4xl text-center space-y-12 z-10"
            >
                {/* ICON WITH ANIMATION */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        {/* Outer ring */}
                        <motion.div
                            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-text-primary/10 via-transparent to-text-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                </motion.div>

                {/* HEADING WITH GRADIENT */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-text-primary via-text-primary to-text-primary/80 bg-clip-text text-transparent">
                                Careers at The Cartel
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl text-text-primary/70 leading-relaxed max-w-2xl mx-auto"
                    >
                        We're building something powerful.
                        <br />
                        And we're looking for the right people to build it with us.
                    </motion.p>
                </div>

                {/* COMING SOON BANNER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(4, 7, 32, 0.1)"
                    }}
                    className="relative rounded-2xl border border-text-primary/10 bg-gradient-to-br from-bg-secondary to-bg-secondary/80 backdrop-blur-md p-8 overflow-hidden"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/5 via-transparent to-text-primary/5 animate-gradient-x" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-6 h-6 rounded-full border-2 border-text-primary/30 border-t-text-primary/60"
                            />
                            <p className="text-2xl font-semibold bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary/70 bg-clip-text text-transparent">
                                Careers Portal Coming Soon
                            </p>
                        </div>

                        <p className="text-text-primary/60 leading-relaxed">
                            Our team is expanding across crypto, digital marketing,
                            product, engineering, and growth.
                            <br />
                            <span className="font-medium">Job listings will be live shortly.</span>
                        </p>
                    </div>
                </motion.div>

                {/* WHAT WE VALUE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-text-primary">
                            We Value
                        </h3>
                        <p className="text-text-primary/60 text-sm">
                            The mindset that drives exceptional results
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Sparkles,
                                title: "Builders",
                                desc: "People who create, break, and rebuild systems with purpose.",
                                color: "from-blue-500/10 to-purple-500/10",
                            },
                            {
                                icon: Rocket,
                                title: "Operators",
                                desc: "Those who execute fast and think long-term.",
                                color: "from-green-500/10 to-teal-500/10",
                            },
                            {
                                icon: Target,
                                title: "Visionaries",
                                desc: "See beyond the obvious, define new realities.",
                                color: "from-orange-500/10 to-red-500/10",
                            },
                            {
                                icon: Zap,
                                title: "Innovators",
                                desc: "Turn ideas into scalable solutions overnight.",
                                color: "from-yellow-500/10 to-amber-500/10",
                            },
                            {
                                icon: Users,
                                title: "Collaborators",
                                desc: "Build together, win together, grow together.",
                                color: "from-indigo-500/10 to-blue-500/10",
                            },
                            {
                                icon: Briefcase,
                                title: "Owners",
                                desc: "Own the outcome, not just the task.",
                                color: "from-gray-500/10 to-slate-500/10",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                                className="relative group"
                            >
                                {/* Card background */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Main card */}
                                <div className="relative rounded-2xl border border-text-primary/10 bg-gradient-to-b from-bg-secondary to-bg-secondary/80 backdrop-blur-sm p-8 transition-all duration-300 group-hover:shadow-xl">
                                    {/* Icon with animation */}
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-text-primary/5 to-text-primary/3 border border-text-primary/10 flex items-center justify-center mb-6"
                                    >
                                        <item.icon className="w-8 h-8 text-text-primary/70" />
                                    </motion.div>

                                    <h4 className="text-xl font-semibold mb-3">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-text-primary/60 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="pt-8"
                >
                    <div className="max-w-md mx-auto space-y-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            {/* Button shine effect */}
                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-text-primary/20 via-text-primary/10 to-text-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <button
                                disabled
                                className="relative px-12 py-5 rounded-xl bg-gradient-to-r from-text-primary/10 to-text-primary/5 border border-text-primary/10 text-text-primary/60 cursor-not-allowed backdrop-blur-sm text-lg font-medium w-full group"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    Opportunities Opening Soon
                                    <motion.span
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        ⏳
                                    </motion.span>
                                </span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* FOOTER NOTE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="pt-8 border-t border-text-primary/10"
                >
                    <p className="text-sm text-text-primary/50">
                        The Cartel is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
                    </p>
                </motion.div>
            </motion.div>

            <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
        </section>
    );
}