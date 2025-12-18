"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote:
            "The Cartel gave us real control over our growth. We scaled traffic without burning budget or fighting black-box systems.",
        name: "Founder",
        role: "DeFi Protocol",
    },
    {
        quote:
            "We finally reached serious crypto-native users. The targeting is sharp and the performance data is brutally honest.",
        name: "Growth Lead",
        role: "Web3 Startup",
    },
    {
        quote:
            "No fluff. No fake impressions. Just clean traffic and campaigns that actually convert.",
        name: "CMO",
        role: "Crypto Exchange",
    },
    {
        quote:
            "The API alone puts this platform ahead. We automated everything and let the system optimize in real time.",
        name: "CTO",
        role: "Blockchain Infrastructure Company",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-background py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-xl sm:text-5xl font-bold tracking-tight">
                        Trusted by Operators Who{" "}
                        <span className="gold-embossed font-bold">
                            Move Markets
                        </span>
                    </h2>

                    <p className="mt-3 text-sm sm:text- md:text-xl text-text-primary/60 max-w-2xl mx-auto">
                        Builders, founders, and growth teams using The Cartel to scale with precision.
                    </p>
                </motion.div>

                {/* Testimonials */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="
                rounded-2xl border border-text-primary/10
                bg-text-primary/5 p-2 md:p-6
                hover:border-yellow-500/40
                transition backdrop-blur-sm
              "
                        >
                            <p className="text-text-primary/80 text-sm sm:text-base leading-relaxed mb-6">
                                “{item.quote}”
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-lg font-semibold">{item.name}</p>
                                    <p className="text-xs text-text-primary/50">
                                        {item.role}
                                    </p>
                                </div>

                                <span className="text-yellow-500 text-xxs md:text-lg">★ ★ ★ ★ ★</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
