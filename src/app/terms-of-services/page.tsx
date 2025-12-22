"use client";

import { motion } from "framer-motion";
import { FileText, Shield, AlertCircle, Users, Scale, Mail } from "lucide-react";

export default function TermsOfServicePage() {
    const sections = [
        {
            title: "Eligibility",
            content: "You must be at least 18 years old to use the Services.",
            icon: Users,
        },
        {
            title: "Use of Services",
            content: "You agree to use The Cartel lawfully and not engage in abusive, misleading, or unauthorized activities.",
            icon: Shield,
        },
        {
            title: "Advertising & Campaigns",
            content: "Campaign performance is not guaranteed. You are responsible for compliance with applicable laws.",
            icon: AlertCircle,
        },
        {
            title: "Web3 Disclaimer",
            content: "Blockchain and crypto interactions are at your own risk. The Cartel does not control external protocols.",
            icon: Shield,
        },
        {
            title: "Limitation of Liability",
            content: "We are not liable for indirect, incidental, or consequential damages.",
            icon: Scale,
        },
        {
            title: "Contact",
            content: "Questions? Contact us at support@thecartel.com.",
            icon: Mail,
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
                            <FileText className="w-5 h-5 text-text-primary/70" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Terms of Service
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

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 p-6 rounded-2xl border border-text-primary/10 bg-bg-secondary/30 backdrop-blur-sm"
                >
                    <p className="text-text-primary/80 leading-relaxed text-center">
                        Welcome to <strong className="text-text-primary">The Cartel</strong>. By using our platform, you
                        agree to these Terms of Service.
                    </p>
                </motion.div>

                {/* Terms Sections */}
                <div className="space-y-6 mb-12">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="group"
                            >
                                <div className="rounded-xl border border-text-primary/10 bg-bg-secondary/30 p-6 backdrop-blur-sm hover:bg-bg-secondary/40 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-text-primary/5 to-text-primary/3 border border-text-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-text-primary/70" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold text-text-primary mb-2">
                                                {section.title}
                                            </h2>
                                            <p className="text-text-primary/70 leading-relaxed">
                                                {section.content}
                                            </p>

                                            {/* Contact Link for Last Section */}
                                            {index === sections.length - 1 && (
                                                <div className="mt-4 pt-4 border-t border-text-primary/10">
                                                    <a
                                                        href="mailto:support@thecartel.com"
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-text-primary text-white text-sm hover:bg-text-primary/90 transition-colors duration-200"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                        Contact Support
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

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="p-6 rounded-2xl border border-text-primary/10 bg-bg-secondary/30 backdrop-blur-sm mb-8"
                >
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-text-primary/70 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-text-primary mb-2">Important Notice</h3>
                            <p className="text-sm text-text-primary/70 leading-relaxed">
                                These Terms of Service govern your use of The Cartel platform. By accessing or using our services,
                                you acknowledge that you have read, understood, and agree to be bound by these terms.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-text-primary/10"
                >
                    <button className="px-6 py-3 rounded-lg border border-text-primary/10 bg-bg-secondary/50 text-text-primary hover:bg-bg-secondary transition-colors duration-200 w-full sm:w-auto">
                        Download Terms
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-text-primary text-white hover:bg-text-primary/90 transition-colors duration-200 w-full sm:w-auto">
                        I Agree to Terms
                    </button>
                </motion.div> */}

                {/* Related Links */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="mt-8 pt-8 border-t border-text-primary/10 text-center"
                >
                    <p className="text-sm text-text-primary/60 mb-4">Related Documents</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/privacy"
                            className="text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200"
                        >
                            Privacy Policy
                        </a>
                        <span className="text-text-primary/30">•</span>
                        <a
                            href="/cookies"
                            className="text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200"
                        >
                            Cookie Policy
                        </a>
                        <span className="text-text-primary/30">•</span>
                        <a
                            href="/security"
                            className="text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200"
                        >
                            Security Policy
                        </a>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}