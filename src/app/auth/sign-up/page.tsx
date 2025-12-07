"use client"

import { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, Eye, EyeOff, Key, Mail, User, Shield, Building2, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import appClient from "@/lib/appClient"
import { toastLoading, toastUpdate } from "@/app/utils/toast-message"

const Page = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showOtpScreen, setShowOtpScreen] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [otpResendTimer, setOtpResendTimer] = useState(120)
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])
    const formRef = useRef<HTMLDivElement>(null)

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto focus to next input
            if (value && index < 5) {
                otpInputRefs.current[index + 1]?.focus()
            }
        }
    }

    // Handle OTP key down (backspace navigation)
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus()
        }
    }

    // OTP resend timer
    useEffect(() => {
        if (showOtpScreen && otpResendTimer > 0) {
            const timer = setTimeout(() => {
                setOtpResendTimer(otpResendTimer - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [showOtpScreen, otpResendTimer])

    // Formik Setup for signup
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            registrationType: "publisher",
            acceptTerms: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Must contain at least one uppercase letter")
                .matches(/[a-z]/, "Must contain at least one lowercase letter")
                .matches(/[0-9]/, "Must contain at least one number")
                .matches(/[!@#$%^&*]/, "Must contain at least one special character")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
            registrationType: Yup.string()
                .oneOf(["publisher", "advertiser"], "Invalid registration type")
                .required("Registration type is required"),
            acceptTerms: Yup.boolean()
                .oneOf([true], "You must accept the terms and conditions")
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const toastId = toastLoading("Signing up...", {
                description: "Adding your credentials, please wait"
            })
            try {

                console.log("Form submitted, OTP sent:", {
                    email: values.email,
                    password: values.password,
                    registrationType: values.registrationType
                })

                const response = await appClient.post("/api/auth/signUp", values)

                console.log("checking res", response)

                if (response.data.status) {
                    toastUpdate(toastId, "success", "Sign up successfull", {
                        description: response.data.message || "Signed up,"
                    })
                    setShowOtpScreen(true)
                }

                toastUpdate(toastId, "success", "Sign up successfull", {
                    description: response.data.message || "Signed up,"
                })
                // Show OTP screen

            } catch (error) {
                console.error("Submission error:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        setIsSubmitting(true)
        const toastId = toastLoading("Checking...", {
            description: "Checking your otp, please wait"
        })
        try {
            const otpCode = otp.join("")

            if (otpCode.length !== 6) {
                alert("Please enter the complete 6-digit OTP")
                return
            }

            console.log("OTP verified, user registered:", {
                email: formik.values.email,
                otp: otpCode,
                registrationType: formik.values.registrationType
            })

            const payload = {
                email: formik.values.email,
                otp: otpCode,
                registrationType: formik.values.registrationType
            }

            const response = await appClient.post("/api/auth/verify-otp", payload)

            if (response.data.status) {
                toastUpdate(toastId, "success", "Verification successfull", {
                    description: response.data.message || "Signed in,"
                })

                router.push("/auth/log-in")
            }

        } catch (error) {
            console.error("Verification error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Resend OTP
    const handleResendOtp = async () => {
        if (otpResendTimer > 0) return

        setIsSubmitting(true)
        try {
            // Simulate OTP resend API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            setOtp(["", "", "", "", "", ""])
            setOtpResendTimer(30)
            otpInputRefs.current[0]?.focus()

            console.log("OTP resent to:", formik.values.email)
        } catch (error) {
            console.error("Resend error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-text-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-text-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.25, 0.1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
                                   linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <div className="flex items-center justify-center flex-1 p-4 md:p-8">
                <motion.div
                    ref={formRef}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-xl relative z-10"
                >
                    {/* Form Container */}
                    <div className="relative">
                        {/* Glowing effect around form */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-text-primary/5 via-text-primary/10 to-text-primary/5 rounded-3xl blur-xl opacity-50" />

                        {/* Form Card */}
                        <div className="relative bg-background/95 backdrop-blur-lg rounded-2xl border border-text-primary/10 shadow-2xl overflow-hidden">
                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-text-primary/5 to-transparent animate-gradient-x" />

                            <div className="relative p-6 md:p-8">
                                {/* Form Header */}
                                <div className="text-center mb-4">
                                    <h2 className="text-2xl md:text-3xl font-semibold text-text-primary/90 mb-2">
                                        Sign Up
                                    </h2>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!showOtpScreen ? (
                                        <motion.div
                                            key="signup-form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                                {/* Email Field */}
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        Email Address
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Mail className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            {...formik.getFieldProps("email")}
                                                            className={`w-full pl-11 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.email && formik.errors.email
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
                                                            placeholder="you@example.com"
                                                        />
                                                    </div>
                                                    {formik.touched.email && formik.errors.email && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {formik.errors.email}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                {/* Password Field */}
                                                <div>
                                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        Password
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Key className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            {...formik.getFieldProps("password")}
                                                            className={`w-full pl-11 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.password && formik.errors.password
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
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
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {formik.errors.password}
                                                        </motion.p>
                                                    ) : (
                                                        <p className="mt-2 text-xs text-text-primary/40">
                                                            Must contain uppercase, lowercase, number & special character
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Confirm Password Field */}
                                                <div>
                                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        Confirm Password
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Shield className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <input
                                                            id="confirmPassword"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            {...formik.getFieldProps("confirmPassword")}
                                                            className={`w-full pl-11 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
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
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {formik.errors.confirmPassword}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                {/* Registration Type Field */}
                                                <div>
                                                    <label htmlFor="registrationType" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        Registration Type
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Building2 className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <select
                                                            id="registrationType"
                                                            {...formik.getFieldProps("registrationType")}
                                                            className="w-full pl-11 pr-4 py-3 bg-background border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-text-primary/20 focus:border-text-primary/40 text-text-primary/90 text-sm appearance-none"
                                                        >
                                                            <option value="publisher">Publisher</option>
                                                            {/* <option value="advertiser" disabled>
                                                                Advertiser (Coming Soon)
                                                            </option> */}
                                                        </select>
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <svg className="w-5 h-5 text-text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs text-text-primary/40">
                                                        Advertiser accounts will be available soon
                                                    </p>
                                                </div>

                                                {/* Terms Checkbox */}
                                                <div className="flex items-start gap-3">
                                                    <div className="flex items-center h-5 mt-0.5">
                                                        <input
                                                            id="acceptTerms"
                                                            type="checkbox"
                                                            {...formik.getFieldProps("acceptTerms")}
                                                            className="w-4 h-4 rounded border-text-primary/30 text-text-primary/60 focus:ring-text-primary/30"
                                                        />
                                                    </div>
                                                    <label htmlFor="acceptTerms" className="text-sm text-text-primary/60">
                                                        I agree to the{" "}
                                                        <a href="#" className="text-text-primary/80 hover:text-text-primary/90 transition-colors underline">
                                                            Terms of Service
                                                        </a>{" "}
                                                        and{" "}
                                                        <a href="#" className="text-text-primary/80 hover:text-text-primary/90 transition-colors underline">
                                                            Privacy Policy
                                                        </a>
                                                    </label>
                                                </div>
                                                {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-xs text-red-500/80"
                                                    >
                                                        {formik.errors.acceptTerms}
                                                    </motion.p>
                                                )}

                                                {/* Submit Button */}
                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="text-base w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                                                >
                                                    {/* Shine effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Sending OTP...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Sign Up</span>
                                                        </>
                                                    )}
                                                </motion.button>

                                                {/* Login Link */}
                                                <div className="text-center pt-6 border-t border-text-primary/10">
                                                    <p className="text-text-primary/60 text-sm">
                                                        Already have an account?{" "}
                                                        <span
                                                            onClick={() => router.push("/auth/log-in")}
                                                            className="text-text-primary/80 hover:text-text-primary font-medium transition-colors cursor-pointer"
                                                        >
                                                            Log In
                                                        </span>
                                                    </p>
                                                </div>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="otp-form"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* OTP Header */}
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-text-primary/10 to-text-primary/5 mb-4">
                                                    <Smartphone className="w-6 h-6 text-text-primary/80" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-text-primary/90 mb-2">
                                                    Verify Your Email
                                                </h3>
                                                <p className="text-text-primary/60 text-sm mb-1">
                                                    Enter the 6-digit code sent to
                                                </p>
                                                <p className="text-text-primary/80 font-medium">
                                                    {formik.values.email}
                                                </p>
                                            </div>

                                            {/* OTP Inputs */}
                                            <div className="space-y-4">
                                                <div className="flex justify-center gap-2">
                                                    {otp.map((digit, index) => (
                                                        <motion.input
                                                            key={index}
                                                            ref={(el: HTMLInputElement | null) => {
                                                                otpInputRefs.current[index] = el
                                                            }}
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={1}
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                            onFocus={(e) => e.target.select()}
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{
                                                                delay: index * 0.1,
                                                                type: "spring",
                                                                stiffness: 200
                                                            }}
                                                            className="w-12 h-12 md:w-14 md:h-14 text-center text-lg font-semibold bg-background border-2 border-text-primary/20 rounded-lg focus:border-text-primary/60 focus:outline-none focus:ring-2 focus:ring-text-primary/20 text-text-primary/90"
                                                        />
                                                    ))}
                                                </div>

                                                {/* Resend OTP */}
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        disabled={otpResendTimer > 0 || isSubmitting}
                                                        className="text-sm text-text-primary/60 hover:text-text-primary/80 disabled:text-text-primary/30 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        {otpResendTimer > 0 ? (
                                                            `Resend code in ${otpResendTimer}s`
                                                        ) : (
                                                            "Resend code"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Verify Button */}
                                            <motion.button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                disabled={isSubmitting || otp.some(d => d === "")}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {/* Shine effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span>Verifying...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-5 h-5" />
                                                        <span>Verify & Complete Sign Up</span>
                                                    </>
                                                )}
                                            </motion.button>

                                            {/* Back to Sign Up */}
                                            <div className="text-center pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowOtpScreen(false)}
                                                    className="text-sm text-text-primary/60 hover:text-text-primary/80 transition-colors"
                                                >
                                                    ← Back to sign up
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="relative z-10 py-4 mt-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-text-primary/30 text-xs">
                        Trusted by major publishers worldwide. Secure & GDPR compliant.
                    </p>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-gradient-x {
                    animation: gradient-x 3s ease infinite;
                    background-size: 200% 200%;
                }

                /* Hide number input arrows */
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                input[type="number"] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    )
}

export default Page