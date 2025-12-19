"use client";

import { motion } from "framer-motion";
import { Brain, ChartBarIncreasing, FlameIcon, Glasses, Target, Zap } from "lucide-react";

const features = [
    {
        title: "Total Campaign Sovereignty",
        subtitle: "You run the game. We provide the weapons.",
        description:
            "Launch, control, and scale your campaigns on your terms. No gatekeepers. No friction.",
        icon: <Glasses className="w-3 h-3 md:w-5 md:h-5" />,
    },
    {
        title: "Precision Audience Warfare",
        subtitle: "Hit the right wallets, not the noise.",
        description:
            "Our targeting engine identifies real crypto users across Web3 ecosystems—traders, builders, degens, and believers.",
        icon: <Target className="w-3 h-3 md:w-5 md:h-5" />,
    },
    {
        title: "Multi-Format Exposure",
        subtitle: "Every screen. Every chain. Every move.",
        description:
            "Deploy banners, native ads, Telegram pushes, influencer placements, and in-app visibility.",
        icon: <FlameIcon className="w-3 h-3 md:w-5 md:h-5" />,
    },
    {
        title: "Developer-Grade API",
        subtitle: "Built for scale. Built for speed.",
        description:
            "Plug directly into The Cartel with a powerful API to manage campaigns and automate growth.",
        icon: <Zap className="w-3 h-3 md:w-5 md:h-5" />,
    },
    {
        title: "Radical Transparency",
        subtitle: "Every click. Every conversion. No lies.",
        description:
            "Track performance in real time with crystal-clear analytics that expose what truly scales.",
        icon: <ChartBarIncreasing className="w-3 h-3 md:w-5 md:h-5" />,
    },
    {
        title: "Autonomous Optimization",
        subtitle: "Let the system sharpen your edge.",
        description:
            "Smart optimization reallocates traffic and maximizes ROI while you focus on expansion.",
        icon: <Brain className="w-3 h-3 md:w-5 md:h-5" />,
    },
];


const stats = [
    {
        value: "200+",
        label: "Active Advertisers",
        description: "Scaling products, protocols, and brands",
    },
    {
        value: "1B+",
        label: "Monthly Impressions",
        description: "Across crypto-native platforms and communities",
    },
    {
        value: "3.5M+",
        label: "Monthly Clicks",
        description: "Driven by real, high-intent Web3 users",
    },
    {
        value: "500+",
        label: "Active Publishers",
        description: "Monetizing traffic through the Cartel network",
    },
];

export default function WhyChooseCoinCartel() {
    return (
        <section className="bg-background md:min-h-screen md:flex md:items-start">
            <div
                className="
          max-w-7xl mx-auto w-full px-5 sm:px-6
          py-10 sm:py-12 md:py-10
          flex flex-col gap-8 sm:gap-10
        "
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-xl sm:text-5xl font-bold tracking-tight">
                        Why Choose Us
                    </h2>

                    <p className="mt-3 text-sm sm:text- md:text-xl text-text-primary/60 max-w-2xl mx-auto">
                        This isn’t advertising. This is controlled growth in the world.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 sm:gap-6 md:mt-12">
                    {features.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="
                rounded-2xl border border-text-primary/10
                bg-text-primary/5 p-2 md:p-5
                hover:border-yellow-500/40 hover:bg-text-primary/10
                backdrop-blur-sm transition
              "
                        >

                            <h3 className="text-xs sm:text-lg font-semibold leading-snug flex items-center gap-1">
                                <span>  {item.icon} </span>  {item.title}
                            </h3>

                            <p className="text-xxs md:text-xs text-text-primary/80 mt-1 mb-2">
                                {item.subtitle}
                            </p>

                            <p className="text-xxs md:text-sm text-text-primary/60 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="
                rounded-md md:rounded-2xl border border-text-primary/10
                bg-text-primary/5 p-2 md:p-6
                backdrop-blur-sm
                hover:border-yellow-500/40
                transition
              "
                        >
                            <h3 className="text-xxs md:text-lg font-bold mb-2">
                                {item.value}
                            </h3>

                            <p className="text-xxs md:text-lg font-medium">
                                {item.label}
                            </p>

                            <p className="text-xxs md:text-sm mt-1 text-text-primary/60">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>


                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
    relative px-8 sm:px-10 py-4 sm:py-5 rounded-xl
    bg-gradient-to-r from-text-primary to-text-primary/90
    text-background text-sm sm:text-base font-semibold tracking-wide
    shadow-lg hover:shadow-xl hover:shadow-yellow-500/20
    transition-all duration-300
    group overflow-hidden
  "
                    >
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Text Wrapper */}
                        <span className="relative flex items-center justify-center gap-2">
                            {/* Default text */}
                            <span className="flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-200">
                                Launch Campaign
                                <Zap className="w-4 h-4 animate-pulse group-hover:animate-none group-hover:rotate-12 transition-transform" />
                            </span>

                            {/* Hover text */}
                            <span className="absolute flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Coming Soon
                                <Zap className="w-4 h-4 text-yellow-400" />
                            </span>
                        </span>
                    </motion.button>


                </div>

            </div>
        </section>


    );
}
