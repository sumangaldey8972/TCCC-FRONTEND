"use client"

import { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, Eye, EyeOff, Sparkles, TrendingUp, Shield, Zap, DollarSign, Users, Clock, BarChart } from "lucide-react"

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    const leftContentRef = useRef<HTMLDivElement>(null)

    // Pixel Animation Effect
    useEffect(() => {
        const createPixelGrid = () => {
            const container = document.querySelector('.pixel-grid-container')
            if (!container) return

            // Clear existing grid
            container.innerHTML = ''

            // Create pixel grid
            const gridSize = 15; // 15x15 grid
            for (let i = 0; i < gridSize * gridSize; i++) {
                const pixel = document.createElement('div')
                pixel.className = 'pixel-cell'

                // Random animation delay
                const delay = Math.random() * 3
                const duration = 1 + Math.random() * 2

                pixel.style.animationDelay = `${delay}s`
                pixel.style.animationDuration = `${duration}s`

                container.appendChild(pixel)
            }
        }

        createPixelGrid()

        // Handle window resize
        const handleResize = () => createPixelGrid()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 3D Animation Effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!formRef.current) return

            const { left, top, width, height } = formRef.current.getBoundingClientRect()
            const x = (e.clientX - left) / width
            const y = (e.clientY - top) / height

            formRef.current.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`
        }

        const formElement = formRef.current
        if (formElement) {
            formElement.addEventListener("mousemove", handleMouseMove)

            return () => {
                formElement.removeEventListener("mousemove", handleMouseMove)
            }
        }
    }, [])

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
            type: "publisher"
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
            acceptTerms: Yup.boolean()
                .oneOf([true], "You must accept the terms and conditions")
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            try {
                // API Call Simulation
                await new Promise(resolve => setTimeout(resolve, 1500))

                console.log("Form submitted:", {
                    email: values.email,
                    type: values.type
                })

                setSubmitSuccess(true)
                setTimeout(() => setSubmitSuccess(false), 3000)
            } catch (error) {
                console.error("Submission error:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    const features = [
        {
            icon: <DollarSign className="w-5 h-5" />,
            title: "Higher Revenue",
            description: "Earn up to 40% more compared to traditional ad networks"
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Brand Safe",
            description: "Only premium, vetted advertisers on our platform"
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Instant Payouts",
            description: "Get paid within 24 hours with multiple payout options"
        },
        {
            icon: <BarChart className="w-5 h-5" />,
            title: "Real-time Analytics",
            description: "Track performance with detailed, real-time dashboards"
        }
    ]

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Pixel Grid Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="pixel-grid-container absolute inset-0 grid grid-cols-15 grid-rows-15 gap-0.5 p-1" />
                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[2px] h-[2px] bg-text-primary rounded-full"
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                                opacity: [0.1, 0.4, 0.1],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.3,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        {/* Left Content - Scrollable */}
                        <div
                            ref={leftContentRef}
                            className="lg:w-1/2 lg:pr-8 lg:overflow-y-auto lg:max-h-[calc(100vh-4rem)] lg:pt-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-text-primary/80 space-y-8 lg:space-y-12"
                            >
                                {/* Hero Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-2">

                                        <h1 className="text-4xl lg:text-5xl font-bold text-text-primary/80">
                                            Maximize Your Revenue
                                        </h1>
                                    </div>
                                    <p className="text-xl lg:text-2xl font-light text-text-primary/60">
                                        High-Performing Publisher Ad Network
                                    </p>
                                </div>

                                {/* Key Benefits */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-4 h-4 text-text-primary/70" />
                                        </div>
                                        <div>
                                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                                Our platform gives publishers a safe and transparent way to earn more from their traffic.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Shield className="w-4 h-4 text-text-primary/70" />
                                        </div>
                                        <div>
                                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                                Enjoy perfectly matched ads, instant payouts, and a streamlined setup powered by industry-leading tools.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-text-primary/5 rounded-xl">
                                        <div className="w-8 h-8 bg-text-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-4 h-4 text-text-primary/70" />
                                        </div>
                                        <div>
                                            <p className="text-lg lg:text-xl text-text-primary/70 leading-relaxed">
                                                Join thousands of successful publishers already maximizing their revenue with our platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features Grid */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-text-primary/80">
                                        Why Choose Our Network?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="p-4 bg-background border border-text-primary/10 rounded-xl hover:border-text-primary/20 transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-text-primary/10 rounded-lg">
                                                        {feature.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-text-primary/80 mb-1">
                                                            {feature.title}
                                                        </h4>
                                                        <p className="text-sm text-text-primary/60">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="pt-4 border-t border-text-primary/10">
                                    <p className="text-text-primary/60 text-sm">
                                        All publishers are protected by our comprehensive fraud detection system
                                        and 24/7 customer support. Start earning today!
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Form - Sticky */}
                        <div className="lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
                            <motion.div
                                ref={formRef}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full"
                            >
                                <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-text-primary/20 via-text-primary/40 to-text-primary/20 animate-gradient-x">
                                    {/* Border Shine Animation */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-text-primary/10 to-transparent animate-shine" />

                                    <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-text-primary/10">
                                        {/* Form Header */}
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                                                Publisher | Sign In
                                            </h2>

                                        </div>

                                        {/* Success Message */}
                                        {submitSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium text-green-500">Registration Successful!</p>
                                                    <p className="text-sm text-green-400/80">Welcome to our publisher network</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                                            {/* Email Field */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-text-primary/70 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...formik.getFieldProps("email")}
                                                    className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.email && formik.errors.email
                                                        ? "border-red-500/50 focus:ring-red-500/30"
                                                        : "border-text-primary/20 focus:border-text-primary/50 focus:ring-text-primary/20"
                                                        } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                                                    placeholder="you@example.com"
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-2 text-sm text-red-400/80"
                                                    >
                                                        {formik.errors.email}
                                                    </motion.p>
                                                )}
                                            </div>

                                            {/* Password Field */}
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-text-primary/70 mb-2">
                                                    Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        {...formik.getFieldProps("password")}
                                                        className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.password && formik.errors.password
                                                            ? "border-red-500/50 focus:ring-red-500/30"
                                                            : "border-text-primary/20 focus:border-text-primary/50 focus:ring-text-primary/20"
                                                            } text-text-primary/80 placeholder-text-primary/30 pr-12 text-sm`}
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/40 hover:text-text-primary/60 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                                {formik.touched.password && formik.errors.password && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-2 text-sm text-red-400/80"
                                                    >
                                                        {formik.errors.password}
                                                    </motion.p>
                                                )}
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary/70 mb-2">
                                                    Confirm Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        {...formik.getFieldProps("confirmPassword")}
                                                        className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                                            ? "border-red-500/50 focus:ring-red-500/30"
                                                            : "border-text-primary/20 focus:border-text-primary/50 focus:ring-text-primary/20"
                                                            } text-text-primary/80 placeholder-text-primary/30 pr-12 text-sm`}
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/40 hover:text-text-primary/60 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-2 text-sm text-red-400/80"
                                                    >
                                                        {formik.errors.confirmPassword}
                                                    </motion.p>
                                                )}
                                            </div>

                                            {/* Terms Checkbox */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center h-5 mt-0.5">
                                                    <input
                                                        id="acceptTerms"
                                                        type="checkbox"
                                                        {...formik.getFieldProps("acceptTerms")}
                                                        className="w-4 h-4 bg-text-primary/10 border-text-primary/30 rounded focus:ring-text-primary/50 focus:ring-2 text-text-primary/60 checked:bg-text-primary/30"
                                                    />
                                                </div>
                                                <label htmlFor="acceptTerms" className="text-sm text-text-primary/50">
                                                    I confirm that I have read and accepted the{" "}
                                                    <a href="#" className="text-text-primary/70 hover:text-text-primary/90 transition-colors underline">
                                                        Terms and Conditions
                                                    </a>{" "}
                                                    and{" "}
                                                    <a href="#" className="text-text-primary/70 hover:text-text-primary/90 transition-colors underline">
                                                        Privacy Policy
                                                    </a>
                                                </label>
                                            </div>
                                            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-sm text-red-400/80"
                                                >
                                                    {formik.errors.acceptTerms}
                                                </motion.p>
                                            )}

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="text-sm w-full py-3 px-4 bg-text-primary hover:bg-text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-background font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-primary/30 focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Sign In
                                                    </>
                                                )}
                                            </button>

                                            {/* Login Link */}
                                            <div className="text-center pt-4 border-t border-text-primary/10">
                                                <p className="text-text-primary/50 text-base">
                                                    Already have an account?{" "}
                                                    <a href="#" className="text-text-primary/70 hover:text-text-primary/90 transition-colors font-medium">
                                                        Sign In
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="relative z-10 border-t border-text-primary/10 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-text-primary/40 text-sm">
                        Trusted by major publishers worldwide. Secure & GDPR compliant.
                    </p>
                </div>
            </div>

            {/* CSS for Pixel Animation */}
            <style jsx>{`
                @keyframes pixelGlow {
                    0%, 100% {
                        opacity: 0.1;
                        background-color: rgba(4, 7, 32, 0.05);
                    }
                    50% {
                        opacity: 0.3;
                        background-color: rgba(4, 7, 32, 0.15);
                    }
                }
                
                .pixel-grid-container {
                    display: grid;
                    grid-template-columns: repeat(15, 1fr);
                    grid-template-rows: repeat(15, 1fr);
                }
                
                .pixel-cell {
                    border: 0.5px solid rgba(4, 7, 32, 0.05);
                    animation: pixelGlow infinite ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default Page