"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect personal information you provide, usage data collected automatically, and campaign-related data when you use our services.",
            icon: Eye,
        },
        {
            title: "2. How We Use Information",
            content: "Information is used to operate the platform, improve performance, provide analytics, communicate updates, and maintain security.",
            icon: Server,
        },
        {
            title: "3. Cookies & Tracking",
            content: "We use cookies and similar technologies to enhance functionality and analyze platform usage.",
            icon: Shield,
        },
        {
            title: "4. Third-Party Services",
            content: "The Cartel integrates with Web3, blockchain, and third-party platforms. We are not responsible for their privacy practices.",
            icon: Server,
        },
        {
            title: "5. Data Security",
            content: "We implement industry-standard security measures to protect your data, though no system is completely secure.",
            icon: Lock,
        },
        {
            title: "6. Your Rights",
            content: "You may request access, correction, or deletion of your data by contacting us.",
            icon: Shield,
        },
        {
            title: "7. Contact",
            content: "For privacy-related questions, contact us at support@thecartel.com.",
            icon: Shield,
        },
    ];

    return (
        <section className="min-h-screen bg-background text-text-primary py-12 md:py-16">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />

            <div className="relative max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-text-primary/5 to-text-primary/3 border border-text-primary/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-text-primary/70" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Privacy Policy
                        </h1>
                    </div>

                    <p className="text-sm text-text-primary/60">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </motion.div>

                {/* Introduction Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 p-6 rounded-2xl border border-text-primary/10 bg-bg-secondary/30 backdrop-blur-sm"
                >
                    <p className="text-text-primary/80 leading-relaxed">
                        Welcome to <strong className="text-text-primary">The Cartel</strong>. Your privacy matters. This
                        Privacy Policy explains how we collect, use, and protect your
                        information when you use our platform.
                    </p>
                </motion.div>

                {/* Policy Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-text-primary/5 via-transparent to-text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative rounded-xl border border-text-primary/10 bg-bg-secondary/30 p-6 backdrop-blur-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-text-primary/5 to-text-primary/3 border border-text-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Icon className="w-4 h-4 text-text-primary/70" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold text-text-primary mb-2">
                                                {section.title}
                                            </h2>
                                            <p className="text-text-primary/70 leading-relaxed">
                                                {section.content}
                                            </p>

                                            {/* Special styling for contact section */}
                                            {index === sections.length - 1 && (
                                                <div className="mt-4 pt-4 border-t border-text-primary/10">
                                                    <a
                                                        href="mailto:support@thecartel.com"
                                                        className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-primary/80 transition-colors duration-200"
                                                    >
                                                        <span className="font-medium">support@thecartel.com</span>
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Simple Footer */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pt-8 border-t border-text-primary/10 text-center"
                >
                    <p className="text-sm text-text-primary/60 mb-4">
                        This Privacy Policy may be updated periodically.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-5 py-2 rounded-lg border border-text-primary/10 bg-bg-secondary/50 text-text-primary text-sm hover:bg-bg-secondary transition-colors duration-200">
                            Download PDF
                        </button>
                        <button className="px-5 py-2 rounded-lg bg-text-primary text-white text-sm hover:bg-text-primary/90 transition-colors duration-200">
                            Accept Policy
                        </button>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}