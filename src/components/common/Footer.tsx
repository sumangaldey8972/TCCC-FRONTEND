"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
    FaTelegramPlane,
    FaDiscord,
    FaArrowRight,
    FaCheck,
    FaRegCopyright
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiSend } from "react-icons/fi";
import logo from "@/assets/logo_svg.png"
import { CategoryInterface } from "@/type/category.type";
import appClient from "@/lib/appClient";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [data, setData] = useState<CategoryInterface[]>([])
    const [loading, setLoading] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // API call simulation
            console.log("Subscribed with:", email);
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail("");
            }, 3000);
        }
    };

    const socialLinks = [
        { icon: <FaTelegramPlane />, label: "Telegram", href: "https://t.me/thecoin_cartel" },
        { icon: <FaXTwitter />, label: "Twitter", href: "https://x.com/thecoin_cartel" },
        // { icon: <FaDiscord />, label: "Discord", href: "#" }
    ];

    const exploreLinks = [
        { label: "Market Insights", href: "#" },
        { label: "Token Listings", href: "#" },
        { label: "Research Reports", href: "#" },
        { label: "Industry News", href: "#" },
        { label: "Educational Guides", href: "#" },
    ];

    const quickLinks = [
        { label: "Advertise With Us", href: "/advertise-with-us" },
        { label: "Publisher", href: "/become-a-publisher" },
        { label: "Crypto Price Prediction", href: "/crypto-prediction" },
        { label: "Brand Collaboration", href: "/consult-with-us" },
    ];

    const companyLinks = [
        { label: "About Us", href: "/about-us" },
        { label: "Careers", href: "/careers" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-services" },
    ];


    const handleCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await appClient.get("/api/category/get", {
                params: {
                    search: "",
                    page: 1,
                    limit: 100,
                    isActive: true,
                    sortBy: 'name',
                    sortOrder: 'asc'
                },
            });

            if (response.data.status) {
                const allCategories = response.data.categories.docs;
                const parentCategories = allCategories.filter(
                    (category: CategoryInterface) =>
                        !category.parent || category.parent === null
                );

                const featured = allCategories.filter(
                    (category: CategoryInterface) => category.isFeatured
                );

                setData(parentCategories);
            }
        } catch (error) {
            console.log("getting error while category list", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleCategories();
    }, [handleCategories]);

    return (
        <footer className="bg-background text-text-primary mt-20">
            {/* Top Gradient Bar */}
            {/* <div className="w-full h-1 bg-gradient-to-r from-transparent via-text-primary/20 to-transparent" /> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                <Image
                                    src={logo.src}
                                    alt="Coin Cartel Logo"
                                    width={48}
                                    height={48}
                                    className="rounded-lg drop-shadow-glow"
                                    priority
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold tracking-tight gold-embossed">The Cartel</h3>
                            </div>
                        </div>

                        <p className="text-text-primary/70 text-sm leading-relaxed">
                            Your gateway to crypto news, market intelligence, token visibility,
                            and blockchain media growth.
                        </p>
                        {/* {https://samdigitalsolutions.ae/sds_logo_transparent.png } */}

                        {/* Sam Digital Solutions Badge */}
                        <div className="pt-4 border-t border-text-primary/10">
                            <div className="flex items-center gap-2 text-text-primary/50 text-xs mb-2">
                                <span>A product by</span>
                            </div>

                            {/* Sam Digital Solutions Hyperlink */}
                            <motion.a
                                href={"https://samdigitalsolutions.ae/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 mt-1 group hover:bg-text-primary/5 p-3 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative w-16 h-9 rounded-lg bg-text-primary/5 overflow-hidden flex items-center justify-center p-1">
                                    <Image
                                        src="https://samdigitalsolutions.ae/sds_logo_transparent.png"
                                        alt="Sam Digital Solutions Logo"
                                        width={64}
                                        height={36}
                                        className="object-contain w-full h-full"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-text-primary font-medium text-sm group-hover:text-text-primary/90 transition-colors">
                                        Sam Digital Solutions UAE
                                    </span>
                                </div>
                            </motion.a>
                        </div>

                        {/* Social Links Grid */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-primary mb-3">Follow Us</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onMouseEnter={() => setHoveredItem(social.label)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className={`relative p-2 rounded-lg border border-text-primary/10 flex items-center justify-center group transition-all duration-200 ${hoveredItem === social.label
                                            ? "bg-text-primary/5 border-text-primary/20"
                                            : "hover:bg-text-primary/5"
                                            }`}
                                    >
                                        <span className="text-text-primary/60 group-hover:text-text-primary text-lg">
                                            {social.icon}
                                        </span>
                                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-text-primary text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {social.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links Columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:col-span-2 gap-8"
                    >
                        {/* Explore */}
                        <div className="space-y-4">
                            <h4 className="text-text-primary font-semibold text-base relative inline-block">
                                News
                                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-text-primary/30 rounded-full" />
                            </h4>
                            <ul className="space-y-2.5">
                                {data.map((cat) => (
                                    <motion.li
                                        key={cat._id}
                                        whileHover={{ x: 5 }}
                                        className="group"
                                    >
                                        <a
                                            href={`/news-blogs/${cat.name}`}
                                            className="capitalize flex items-center text-text-primary/70 hover:text-text-primary text-sm transition-colors"
                                        >
                                            <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            {cat.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* For Projects */}
                        <div className="space-y-4">
                            <h4 className="text-text-primary font-semibold text-base relative inline-block">
                                Quick links
                                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-text-primary/30 rounded-full" />
                            </h4>
                            <ul className="space-y-2.5">
                                {quickLinks.map((link) => (
                                    <motion.li
                                        key={link.label}
                                        whileHover={{ x: 5 }}
                                        className="group"
                                    >
                                        <a
                                            href={link.href}
                                            className="flex items-center text-text-primary/70 hover:text-text-primary text-sm transition-colors"
                                        >
                                            <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-4">
                            <h4 className="text-text-primary font-semibold text-base relative inline-block">
                                Company
                                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-text-primary/30 rounded-full" />
                            </h4>
                            <ul className="space-y-2.5">
                                {companyLinks.map((link) => (
                                    <motion.li
                                        key={link.label}
                                        whileHover={{ x: 5 }}
                                        className="group"
                                    >
                                        <a
                                            href={link.href}
                                            className="flex items-center text-text-primary/70 hover:text-text-primary text-sm transition-colors"
                                        >
                                            <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Newsletter Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <h4 className="text-text-primary font-semibold text-base mb-2">
                                Stay Updated
                            </h4>
                            <p className="text-text-primary/60 text-sm mb-4">
                                Get weekly crypto insights & exclusive updates directly in your inbox.
                            </p>

                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/40" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-text-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-text-primary/20 focus:border-text-primary/30 text-text-primary text-sm placeholder-text-primary/40 transition-all"
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${subscribed
                                        ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                        : "bg-text-primary text-background hover:bg-text-primary/90"
                                        }`}
                                >
                                    {subscribed ? (
                                        <>
                                            <FaCheck className="w-4 h-4" />
                                            Subscribed!
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-4 h-4" />
                                            Subscribe Now
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <p className="text-text-primary/40 text-xs mt-2">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="pt-6 border-t border-text-primary/10">
                            <h4 className="text-text-primary font-semibold text-sm mb-3">
                                Contact Us
                            </h4>
                            <div className="space-y-2">
                                <a
                                    href="mailto:support@thecoincartel.club"
                                    className="flex items-center gap-2 text-text-primary/70 hover:text-text-primary text-sm transition-colors group"
                                >
                                    <div className="w-6 h-6 rounded bg-text-primary/5 flex items-center justify-center group-hover:bg-text-primary/10 transition-colors">
                                        <span className="text-xs">📧</span>
                                    </div>
                                    thecartel@samdigitalsolutions.ai
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-text-primary/10 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-text-primary/50 text-sm text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <FaRegCopyright className="w-3 h-3" />
                                <span>{new Date().getFullYear()} The Cartel Club. All rights reserved.</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <a
                                href="#"
                                className="text-text-primary/50 hover:text-text-primary transition-colors text-xs md:text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-text-primary/50 hover:text-text-primary transition-colors text-xs md:text-sm"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-text-primary/50 hover:text-text-primary transition-colors text-xs md:text-sm"
                            >
                                Cookie Policy
                            </a>
                        </div>

                        <div className="text-text-primary/40 text-xs text-center md:text-right">
                            <div className="hidden md:block">Built with ❤️ for the crypto community</div>
                            <div className="md:hidden">Empowering crypto innovation</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/5 to-transparent" />
        </footer>
    );
}