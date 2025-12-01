// components/navigation/PublicNavbarVTwo.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, CircleChevronDown, Wallet, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import ProfileDropdown from "../navbar/ProfileDropdown";
import appClient from "@/lib/appClient";
import { signout } from "@/store/slices/authSlice";



const PublicNavbarVTwo = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("/");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTradeMenuOpen, setIsTradeMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dispatch = useAppDispatch()

    const tradeMenuRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const authedUser = useAppSelector((state) => state.auth.user);

    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navLinks = [
        { name: "Approvals", href: "/approvals", type: "link", isChildren: false }
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         // Don't close if clicking inside trade menu
    //         if (tradeMenuRef.current && !tradeMenuRef.current.contains(event.target as Node)) {
    //             setIsTradeMenuOpen(false);
    //         }

    //         // Don't close if clicking inside profile dropdown
    //         if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
    //             setIsProfileOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const handleAnchorClick = (href: string) => {
        const id = href.replace("/#", "");
        if (pathname !== "/") {
            router.push(href);
        } else {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
        setActiveLink(href);
    };

    // Color scheme
    const textColor = "text-text-primary";
    const hoverColor = "hover:text-text-primary/70";
    const buttonBg = "bg-[#4965d2] hover:bg-[#3a52b8]";
    const buttonText = "text-white";
    const mobileMenuBg = "bg-background backdrop-blur-lg";

    // Close all dropdowns
    const closeAllDropdowns = () => {
        setIsTradeMenuOpen(false);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            const res = await appClient.post('/api/auth/logout', {});
            if (res.data.status) {
                setIsProfileOpen(false); // 👈 ensure dropdown closed
                dispatch(signout());
                router.replace("/auth/sign-in");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 w-full z-50 bg-[var(--background)] bg-[image:var(--background-gradient)] transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm bg-opacity-90' : ''}`}
            >
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo & Navigation */}
                        <div className="flex items-center gap-4 md:gap-8">
                            <Link
                                href="/"
                                onClick={() => setActiveLink("/")}
                                className={`flex items-center space-x-2 text-xl font-bold ${textColor} ${hoverColor} transition-colors`}
                            >
                                <div className="relative">
                                    {theme === "dark" ? (
                                        <Image
                                            src="/assets/CoinXinvest White Logo.jpg"
                                            alt="CoinX Investment Logo"
                                            width={120}
                                            height={120}
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/CoinXinvest Black logo .jpg"
                                            alt="CoinX Investment Logo"
                                            width={120}
                                            height={120}
                                        />
                                    )}
                                </div>
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="relative" ref={link.isChildren ? tradeMenuRef : null}>
                                        {link.isChildren ? (
                                            <button
                                                onMouseEnter={() => setIsTradeMenuOpen(true)}
                                                onMouseLeave={() => setIsTradeMenuOpen(false)}
                                                onClick={() => setIsTradeMenuOpen(!isTradeMenuOpen)}
                                                className={`relative text-xs px-1 py-2 transition-all duration-300 ${textColor} ${hoverColor} font-medium flex items-center group`}
                                            >
                                                {link.name}
                                                <CircleChevronDown
                                                    size={14}
                                                    className={`ml-1 transition-transform duration-300 ${isTradeMenuOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={(e) => {
                                                    if (link.type === "anchor") {
                                                        e.preventDefault();
                                                        handleAnchorClick(link.href);
                                                    } else {
                                                        setActiveLink(link.href);
                                                    }
                                                }}
                                                className={`relative text-xs px-1 py-2 transition-all duration-300 ${textColor} ${hoverColor} font-medium flex items-center group`}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                            {authedUser ? (
                                // Authenticated User Section
                                <div className="flex items-center space-x-2 lg:space-x-3">
                                    <div ref={profileRef} className="relative">
                                        <ProfileDropdown
                                            user={authedUser}
                                            isOpen={isProfileOpen}
                                            onToggle={() => setIsProfileOpen(!isProfileOpen)}
                                            onClose={() => setIsProfileOpen(false)}
                                            onLogout={handleLogout}
                                        />
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`p-2 rounded-lg transition-all duration-300 ${textColor} ${hoverColor}`}
                                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                                    >
                                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                                    </button>
                                </div>
                            ) : (
                                // Unauthenticated User Section
                                <>
                                    <Link
                                        onClick={() => setActiveLink("/auth/sign-in")}
                                        href="/auth/sign-in"
                                        className={`text-xs px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 text-text-primary ${hoverColor} border border-transparent font-medium`}
                                    >
                                        Login
                                    </Link>
                                    <button
                                        onClick={toggleTheme}
                                        className={`p-2 rounded-lg transition-all duration-300 ${textColor} ${hoverColor}`}
                                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                                    >
                                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center space-x-2">
                            {authedUser && (
                                <div ref={profileRef}>
                                    <ProfileDropdown
                                        onLogout={handleLogout}
                                        user={authedUser}
                                        isOpen={isProfileOpen}
                                        onToggle={() => setIsProfileOpen(!isProfileOpen)}
                                        onClose={() => setIsProfileOpen(false)}
                                    />
                                </div>
                            )}

                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all duration-300 ${textColor} ${hoverColor}`}
                                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                            >
                                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-lg ${textColor} ${hoverColor} transition-colors`}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`md:hidden ${mobileMenuBg} border-t border-bg-secondary shadow-xl`}
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.isChildren ? (
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => setIsTradeMenuOpen(!isTradeMenuOpen)}
                                                    className={`text-sm block px-3 py-3 rounded-lg transition-all duration-300 border w-full text-left ${activeLink === link.href
                                                        ? "bg-background/70 text-text-primary border-sky-400/30 font-semibold"
                                                        : `${textColor} ${hoverColor} border-transparent`
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        {link.name}
                                                        <CircleChevronDown
                                                            size={16}
                                                            className={`opacity-60 transition-transform duration-300 ${isTradeMenuOpen ? 'rotate-180' : ''}`}
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={(e) => {
                                                    if (link.type === "anchor") {
                                                        e.preventDefault();
                                                        handleAnchorClick(link.href);
                                                    } else {
                                                        setActiveLink(link.href);
                                                    }
                                                    closeAllDropdowns();
                                                }}
                                                className={`text-sm block px-3 py-3 rounded-lg transition-all duration-300 border ${activeLink === link.href
                                                    ? "bg-background/70 text-text-primary border-sky-400/30 font-semibold"
                                                    : `${textColor} ${hoverColor} border-transparent`
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    {link.name}
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}



                                {!authedUser && (
                                    <div className="flex items-center gap-3 pt-4 mt-4 border-t border-bg-secondary">
                                        <Link
                                            href="/auth/sign-in"
                                            onClick={closeAllDropdowns}
                                            className={`flex-1 px-4 py-3 text-text-primary ${hoverColor} border border-bg-secondary rounded-lg transition-all duration-300 font-medium text-center text-sm`}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16" />
        </>
    );
};

export default PublicNavbarVTwo;