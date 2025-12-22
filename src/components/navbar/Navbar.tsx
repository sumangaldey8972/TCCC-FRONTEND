"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import logo from "@/assets/logo_svg.png"
import { useRouter } from "next/navigation"
import { useTheme } from "@/providers/ThemeProvider"
import { Bell, Moon, Sun, Menu, X, User, Wallet, LogOut, Eye, EyeOff, Settings, CreditCard, HelpCircle, Shield } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks"
import appClient from "@/lib/appClient"
import { signout } from "@/store/slices/authSlice"
// import { logout } from "@/store/slices/authSlice" // Assuming you have logout action

const Navbar = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isAuthedUser, setIsAuthedUser] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [showBalance, setShowBalance] = useState(false)
    const { theme, setTheme } = useTheme()
    const [loading, setLoading] = useState(false)

    const userMenuRef = useRef<HTMLDivElement>(null)
    const userButtonRef = useRef<HTMLButtonElement>(null)

    const user = useAppSelector((store) => store.auth.user)

    useEffect(() => {
        if (user) {
            setIsAuthedUser(true)
        } else {
            setIsAuthedUser(false)
        }
    }, [user])

    const navItems = [
        { label: "Publisher", href: "/become-a-publisher" },
        { label: "News | Blogs", href: "/news-blogs" },
        { label: "NFTs", href: "/nfts" },
        { label: "Crypto Prediction", href: "/crypto-prediction" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "Advertiser", href: "/become-a-advertiser" },
    ]

    // User menu items (can be expanded later)
    const userMenuItems = [
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: CreditCard, label: "Billing", href: "/billing" },
        { icon: Shield, label: "Security", href: "/security" },
        { icon: HelpCircle, label: "Help & Support", href: "/help" },
    ]

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await appClient.post('/api/auth/log-out', {})

            if (res.data.status) {
                dispatch(signout())
                setLoading(false)
                setIsUserMenuOpen(false)
                router.push("/")
            }

        } catch (error) {
            setLoading(false)
        }
    };

    const formatEmail = (email: string) => {
        if (!email) return ""
        const [username, domain] = email.split('@')
        if (username.length > 3) {
            return `${username.substring(0, 3)}***@${domain}`
        }
        return `***@${domain}`
    }

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const maskBalance = (amount: string) => {
        if (showBalance) return amount
        return "••••••••"
    }

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
                                The Cartel
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onClick={() => window.location.replace(item.href)}
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

                                    {/* User Profile Menu */}
                                    <div className="relative dropdown" ref={userMenuRef}>
                                        <motion.button
                                            ref={userButtonRef}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={toggleUserMenu}
                                            className="flex items-center gap-2 p-2 rounded-full bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors duration-200"
                                            aria-label="User menu"
                                        >
                                            <User size={20} />
                                        </motion.button>

                                        {/* User Dropdown Menu */}
                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-72 bg-[var(--background)]/95 backdrop-blur-xl rounded-xl border border-[var(--border)]/30 shadow-2xl overflow-hidden z-50"
                                                >
                                                    {/* User Info */}
                                                    <div className="p-4 border-b border-[var(--border)]/20">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center border border-[var(--primary)]/30">
                                                                <User size={18} className="text-[var(--primary)]" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-semibold text-[var(--foreground)] truncate">
                                                                    {user?.fullName || "User"}
                                                                </p>
                                                                <p className="text-xs text-[var(--muted-foreground)] truncate">
                                                                    {user?.email || ""}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Balance Section */}
                                                    <div className="p-4 border-b border-[var(--border)]/20">
                                                        <div className="flex flex-col items-start justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Wallet size={16} className="text-[var(--primary)]" />
                                                                <span className="text-sm text-[var(--muted-foreground)]">
                                                                    Wallet Balance
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-lg font-bold text-[var(--foreground)]">
                                                                    ${maskBalance("0.00")}
                                                                </p>
                                                                <motion.button
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => setShowBalance(!showBalance)}
                                                                    className="p-1 rounded hover:bg-[var(--primary)]/10"
                                                                    aria-label={showBalance ? "Hide balance" : "Show balance"}
                                                                >
                                                                    {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Menu Items */}
                                                    {/* <div className="py-2">
                                                        {userMenuItems.map((item, index) => {
                                                            const Icon = item.icon
                                                            return (
                                                                <motion.button
                                                                    key={index}
                                                                    whileHover={{ x: 5 }}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors duration-200"
                                                                    onClick={() => {
                                                                        window.location.replace(item.href)
                                                                        setIsUserMenuOpen(false)
                                                                    }}
                                                                >
                                                                    <Icon size={16} className="text-[var(--primary)]" />
                                                                    {item.label}
                                                                </motion.button>
                                                            )
                                                        })}
                                                    </div> */}

                                                    {/* Logout Button */}
                                                    <div className="p-4 border-t border-[var(--border)]/20">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                                                        >
                                                            <LogOut size={16} />
                                                            {loading ? "logging out..." : "Logout"}
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium hover:text-[var(--primary)] transition-colors duration-200"
                                        onClick={() => window.location.replace("/auth/log-in")}
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
                                                window.location.replace(item.href)
                                                setIsMobileMenuOpen(false)
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
                                        {/* User Info */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center border border-[var(--primary)]/30">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{user?.fullName || "User"}</p>
                                                    <p className="text-xs text-[var(--muted-foreground)]">
                                                        {formatEmail(user?.email || "")}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="p-2 rounded-lg hover:bg-[var(--primary)]/10">
                                                <Bell size={20} />
                                            </button>
                                        </div>

                                        {/* Balance Section */}
                                        <div className="p-4 rounded-xl border border-[var(--border)]/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Wallet size={16} className="text-[var(--primary)]" />
                                                    <span className="text-sm text-[var(--muted-foreground)]">Wallet Balance</span>
                                                </div>
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setShowBalance(!showBalance)}
                                                    className="p-1 rounded hover:bg-[var(--primary)]/10"
                                                    aria-label={showBalance ? "Hide balance" : "Show balance"}
                                                >
                                                    {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </motion.button>
                                            </div>
                                            <p className="text-xl font-bold text-[var(--foreground)]">
                                                ${maskBalance("0.00")}
                                            </p>
                                        </div>

                                        {/* Mobile User Menu Items */}
                                        {/* <div className="grid grid-cols-2 gap-2">
                                            {userMenuItems.map((item, index) => {
                                                const Icon = item.icon
                                                return (
                                                    <button
                                                        key={index}
                                                        className="flex flex-col items-center gap-1 p-3 rounded-lg border border-[var(--border)]/30 hover:bg-[var(--primary)]/5 transition-colors"
                                                        onClick={() => {
                                                            window.location.replace(item.href)
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        <Icon size={18} className="text-[var(--primary)]" />
                                                        <span className="text-xs">{item.label}</span>
                                                    </button>
                                                )
                                            })}
                                        </div> */}

                                        {/* Logout Button for Mobile */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200 mt-4"
                                        >
                                            <LogOut size={16} />
                                            {loading ? "Loggin out..." : "Logout"}
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-3 rounded-lg text-center border border-[var(--border)] hover:bg-[var(--primary)]/10 transition-colors duration-200"
                                            onClick={() => {
                                                window.location.replace("/auth/log-in")
                                                setIsMobileMenuOpen(false)
                                            }}
                                        >
                                            Login
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-medium"
                                            onClick={() => {
                                                window.location.replace("/auth/sign-up")
                                                setIsMobileMenuOpen(false)
                                            }}
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