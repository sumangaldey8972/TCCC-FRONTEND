"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/assets/logo_svg.png";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Bell, Moon, Sun, Menu, X, ChevronDown, Search, User, Wallet } from "lucide-react";
import { useAppSelector } from "@/store/hooks/hooks";

const Navbar = () => {
    const router = useRouter()
    const [isAuthedUser, setIsAuthedUser] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const { theme, setTheme } = useTheme()

    const user = useAppSelector((store) => store.auth.user)

    useEffect(() => {
        if (user) {
            setIsAuthedUser(true)
        }
    }, [user])

    const navItems = [
        { label: "Publisher", href: "/become-a-publisher" },
        { label: "NFTs", href: "#" },
        { label: "Crypto Prediction", href: "#" },
        { label: "News | Blogs", href: "#" },
        { label: "Tokenomics", href: "/tokenomics" },
    ];

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.dropdown')) {
                setDropdownOpen(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-[var(--background)]/90 backdrop-blur-xl shadow-lg border-b border-[var(--border)]/20'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-3 group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/")}
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Image
                                    src={logo.src}
                                    alt="Coin Cartel Logo"
                                    width={48}
                                    height={48}
                                    className="rounded-lg drop-shadow-glow"
                                    priority
                                />
                            </motion.div>

                            <span className="text-lg font-bold gold-embossed">
                                The Coin Cartel
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative dropdown"
                                    onClick={() => router.replace(item.href)}
                                >
                                    <button
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200 group"
                                    >
                                        {item.label}

                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Auth Section */}
                            {isAuthedUser ? (
                                <div className="hidden lg:flex items-center gap-4">
                                    {/* Notifications */}
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors duration-200 relative"
                                            aria-label="Notifications"
                                        >
                                            <Bell size={20} />
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        </motion.button>
                                    </div>

                                    {/* Wallet Balance */}
                                    <div className="px-4 py-2 rounded-xl bg-dark-800 border border-[var(--border)]/30">
                                        <div className="flex items-center gap-2">
                                            <Wallet size={16} className="text-[var(--primary)]" />
                                            <div>
                                                <p className="text-xs text-[var(--muted-foreground)]">Balance</p>
                                                <p className="text-sm font-semibold">$ 0.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Profile */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="p-2 rounded-full bg-background text-primary cursor-pointer"
                                    >
                                        <User size={20} />
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium hover:text-[var(--primary)] transition-colors duration-200"
                                        onClick={() => router.push("/auth/log-in")}
                                    >
                                        Login
                                    </motion.button>
                                </div>
                            )}

                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors duration-300"
                                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                            >
                                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            </motion.button>

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-16 lg:hidden left-0 right-0 z-40 bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]/20 overflow-hidden"
                    >
                        <div className="px-4 py-6">
                            {/* Mobile Navigation Items */}
                            <div className="space-y-2">
                                {navItems.map((item) => (
                                    <div key={item.label}>
                                        <button
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium hover:bg-[var(--primary)]/10 transition-colors duration-200"
                                            onClick={() => {
                                                router.push(item.href);
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            {item.label}

                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Auth Section */}
                            <div className="mt-6 pt-6 border-t border-[var(--border)]/20">
                                {isAuthedUser ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">User Account</p>
                                                    <p className="text-xs text-[var(--muted-foreground)]">Advertiser</p>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-lg hover:bg-[var(--primary)]/10">
                                                <Bell size={20} />
                                            </button>
                                        </div>
                                        <div className="p-4 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-[var(--muted-foreground)]">Advertiser Balance</p>
                                                    <p className="text-lg font-semibold">$ 0.00</p>
                                                </div>
                                                <Wallet size={20} className="text-[var(--primary)]" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-3 rounded-lg text-center border border-[var(--border)] hover:bg-[var(--primary)]/10 transition-colors duration-200"
                                            onClick={() => router.push("/auth/log-in")}
                                        >
                                            Login
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium"
                                            onClick={() => router.push("/auth/sign-up")}
                                        >
                                            Sign Up
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add padding to prevent content from hiding behind navbar */}
            <div className="h-16 lg:h-20" />
        </>
    )
}

export default Navbar