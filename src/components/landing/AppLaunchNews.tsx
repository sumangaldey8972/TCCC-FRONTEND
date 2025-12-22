"use client";

import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { FiDownload, FiSmartphone, FiTrendingUp, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import BackgroundGlobe from "../ui/BackgroundGlobe";

export default function AppLaunchNews() {

    return (
        <section className="relative bg-background py-16 sm:py-24 overflow-hidden">
            <BackgroundGlobe />

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                {/* Enhanced Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <h2 className="text-3xl font-bold tracking-tight">
                        The Cartel App is

                        <span className="relative">
                            <span className="text-text-primary"> Coming Soon.</span>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="absolute -bottom-2 left-0 h-1 bg-text-primary/50 rounded-full"
                            />
                        </span>
                    </h2>
                    <h3 className="mt-4 text-xl text-text-primary/80">
                        Available soon in <span className="text-text-primary">Everywhere.</span>
                    </h3>
                </motion.div>

                {/* Enhanced Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-10"
                >
                    <p className="text-sm text-text-primary/70 max-w-3xl mx-auto leading-relaxed">
                        Will be available on Google Play Store and Apple App Store.
                        Stay ahead with cartel-grade crypto news, real-time alerts,
                        and market intelligence — wherever you move.
                    </p>
                </motion.div>

                {/* Enhanced Store Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-row justify-center gap-5"
                >
                    {/* Apple - Enhanced */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                           relative group
                           inline-flex items-center justify-center gap-4
                           px-4 py-2 md:px-8 md:py-4 rounded-md md:rounded-2xl
                           bg-gradient-to-r from-text-primary to-text-primary/90
                           text-background font-semibold text-base
                           overflow-hidden
                           shadow-xl shadow-text-primary/10
                        "
                    >
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <FaApple className="w-3 h-3 md:w-6 md:h-6 relative z-10" />
                        <div className="relative z-10 text-left">
                            <div className="text-xxs md:text-xs opacity-80">Download on the</div>
                            <div className="text-xxs md:text-lg">App Store</div>
                        </div>

                        {/* Download Animation */}
                        <motion.div
                            className="absolute -right-8 group-hover:right-4 transition-all duration-300"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <FiDownload className="w-5 h-5 opacity-70" />
                        </motion.div>
                    </motion.a>

                    {/* Google - Enhanced */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                           relative group
                           inline-flex items-center justify-center gap-4
                           px-4 py-2 md:px-8 md:py-4 rounded-md md:rounded-2xl
                           border-2 border-text-primary/20
                           bg-gradient-to-br from-text-primary/10 to-text-primary/5
                           text-text-primary font-semibold text-base
                           overflow-hidden
                           backdrop-blur-sm
                        "
                    >
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <FaGooglePlay className="w-3 h-3 md:w-6 md:h-6 relative z-10" />
                        <div className="relative z-10 text-left">
                            <div className="text-xxs md:text-xs opacity-80">Get it on</div>
                            <div className="text-xxs md:text-lg">Google Play</div>
                        </div>
                    </motion.a>
                </motion.div>

                {/* App Features Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 p-2 md:p-6 rounded-2xl border border-text-primary/10
                             bg-text-primary/5 to-transparent
                             max-w-3xl mx-auto backdrop-blur-sm"
                >
                    <h4 className="text-xs md:text-lg font-semibold mb-1 md:mb-4">What&apos;s Inside?</h4>
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                        {[
                            "Real-time Market Data",
                            "Cartel-grade Analysis",
                            "Instant Alerts",
                            "Portfolio Tracking",
                            "Secure Wallet",
                            "Community Tools"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1 h-1 md:w-2 md:h-2 bg-text-primary rounded-full" />
                                <span className="text-xxs md:text-sm text-text-primary/80">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Footer Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="inline-flex items-center gap-3 px-3 py-1 md:px-6 md:py-3 rounded-full
                                 bg-text-primary/10 to-transparent
                                 border border-text-primary/20"
                    >
                        <div className="w-1 h-1 md:w-2 md:h-2 bg-text-primary rounded-full animate-pulse" />
                        <span className="text-xs md:text-sm font-semibold tracking-wider text-text-primary/80">
                            ONE CARTEL • ONE APP • FULL CONTROL
                        </span>
                        <div className="w-1 h-1 md:w-2 md:h-2 bg-text-primary rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}