"use client"

import { useState, useRef } from "react"
import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, Mail, Key, Lock, ArrowLeft, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import appClient from "@/lib/appClient"
import { toastLoading, toastUpdate } from "@/app/utils/toast-message"

const Page = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Email, 2: OTP, 3: Password
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [otpVerified, setOtpVerified] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Email verification step
    const emailFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const toastId = toastLoading("Sending OTP...", {
                description: "Sending OTP for verification"
            })
            try {
                // Simulate API call to send OTP


                const response = await appClient.post("/api/auth/resend-otp", { email: values.email })

                if (response.data.status) {
                    console.log("OTP sent to:", values.email)
                    toastUpdate(toastId, "success", "OTP send to your email", {
                        description: response.data.message
                    })
                    setStep(2)
                    setResendCooldown(120)
                } else {
                    toastUpdate(toastId, "warning", "", {
                        description: response.data.message
                    })
                }

            } catch (error) {
                console.error("Error sending OTP:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    // OTP verification
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus()
        }

        // // Auto-submit if all digits filled
        // if (newOtp.every(digit => digit !== "") && index === 6) {
        //     verifyOtp()
        // }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus()
        }
    }

    const verifyOtp = async () => {
        setIsSubmitting(true)
        const toastId = toastLoading("Checking...", {
            description: "Checking your otp, please wait"
        })
        try {
            // Simulate OTP verification
            const otpString = otp.join("")

            const payload = {
                email: emailFormik.values.email,
                otp: otpString
            }

            const response = await appClient.post("/api/auth/verify-otp", payload)
            console.log("response", response)
            if (response.data.status) {

                toastUpdate(toastId, "success", "Verification successfull", {
                    description: response.data.message || "Signed in,"
                })

                setOtpVerified(true)
                setStep(3)
            } else {
                toastUpdate(toastId, "warning", "", {
                    description: response.data.message || "Signed in,"
                })
            }



        } catch (error) {
            console.error("OTP verification error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const resendOtp = async () => {
        if (resendCooldown > 0) return

        setIsSubmitting(true)
        const toastId = toastLoading("Sending OTP...", {
            description: "Sending OTP for verification"
        })
        try {
            await new Promise(resolve => setTimeout(resolve, 800))
            setResendCooldown(30)

            const response = await appClient.post("/api/auth/resend-otp", { email: emailFormik.values.email })

            if (response.data.status) {
                console.log("OTP sent to:", emailFormik.values.email)
                toastUpdate(toastId, "success", "OTP send to your email", {
                    description: response.data.message
                })
                setStep(2)
                setResendCooldown(120)
            } else {
                toastUpdate(toastId, "warning", "", {
                    description: response.data.message
                })
            }
        } catch (error) {
            console.error("Error resending OTP:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Password reset step
    const passwordFormik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Must contain at least one uppercase letter")
                .matches(/[a-z]/, "Must contain at least one lowercase letter")
                .matches(/\d/, "Must contain at least one number")
                .matches(/[@$!%*?&#]/, "Must contain at least one special character")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Please confirm your password"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const toastId = toastLoading("Changin...", {
                description: "Changin your password, please wait"
            })
            try {
                console.log("Password reset for:", emailFormik.values.email, values.password)
                const payload = {
                    email: emailFormik.values.email,
                    password: values.password
                }
                const response = await appClient.post("/api/auth/forgot-password", payload)

                if (response.data.status) {
                    toastUpdate(toastId, "success", "Password changed", {
                        description: response.data.message || "Signed in,"
                    })
                    setSubmitSuccess(false)
                    router.push("/auth/log-in")
                } else {
                    toastUpdate(toastId, "warning", "", {
                        description: response.data.message || "Signed in,"
                    })
                }


                // Redirect to login after success


            } catch (error) {
                console.error("Password reset error:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    return (
        <div className="bg-background relative overflow-hidden">
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

            {/* Back button */}
            <div className="absolute top-6 left-6 z-20">
                <motion.button
                    onClick={() => step === 1 ? router.back() : setStep(step - 1 as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-text-primary/60 hover:text-text-primary transition-colors p-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm">Back</span>
                </motion.button>
            </div>

            <div className="flex items-center justify-center p-4 md:p-8">
                <motion.div
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
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-text-primary/10 to-text-primary/5 mb-4">
                                        {step === 1 ? (
                                            <Mail className="w-6 h-6 text-text-primary/80" />
                                        ) : step === 2 ? (
                                            <Shield className="w-6 h-6 text-text-primary/80" />
                                        ) : (
                                            <Lock className="w-6 h-6 text-text-primary/80" />
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-text-primary/90 mb-2">
                                        {step === 1 ? "Reset Password" : step === 2 ? "Verify Email" : "New Password"}
                                    </h2>
                                    <p className="text-text-primary/60 text-sm">
                                        {step === 1
                                            ? "Enter your email to receive a verification code"
                                            : step === 2
                                                ? `Enter the 6-digit code sent to ${emailFormik.values.email}`
                                                : "Create a new password for your account"
                                        }
                                    </p>
                                </div>

                                {/* Progress Steps */}
                                <div className="flex items-center justify-center mb-8">
                                    <div className="flex items-center">
                                        {[1, 2, 3].map((stepNum) => (
                                            <div key={stepNum} className="flex items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                                                    ${stepNum < step ? "bg-green-500/20 text-green-500" :
                                                        stepNum === step ? "bg-text-primary text-background" :
                                                            "bg-text-primary/10 text-text-primary/40"}`}>
                                                    {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
                                                </div>
                                                {stepNum < 3 && (
                                                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300
                                                        ${stepNum < step ? "bg-green-500" : "bg-text-primary/10"}`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Success Message */}
                                {submitSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-green-500">Password Reset Successful!</p>
                                            <p className="text-xs text-green-500/70">Redirecting to login...</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1: Email Input */}
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <form onSubmit={emailFormik.handleSubmit} className="space-y-6">
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
                                                            {...emailFormik.getFieldProps("email")}
                                                            className={`w-full pl-11 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${emailFormik.touched.email && emailFormik.errors.email
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
                                                            placeholder="you@example.com"
                                                        />
                                                    </div>
                                                    {emailFormik.touched.email && emailFormik.errors.email && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {emailFormik.errors.email}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <span>Send Verification Code</span>
                                                    )}
                                                </motion.button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Step 2: OTP Verification */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="space-y-6">
                                                {/* OTP Inputs */}
                                                <div>
                                                    <label className="block text-sm font-medium text-text-primary/80 mb-4 text-center">
                                                        Enter 6-digit verification code
                                                    </label>
                                                    <div className="flex justify-center gap-3">
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
                                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                                className="w-12 h-14 text-center text-xl font-semibold bg-background border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-text-primary/40 focus:border-text-primary/40 transition-all"
                                                                whileFocus={{ scale: 1.05 }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Resend OTP */}
                                                <div className="text-center">
                                                    <p className="text-text-primary/60 text-sm mb-2">
                                                        Didn't receive the code?
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={resendOtp}
                                                        disabled={resendCooldown > 0 || isSubmitting}
                                                        className="text-text-primary/70 hover:text-text-primary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {resendCooldown > 0
                                                            ? `Resend in ${resendCooldown}s`
                                                            : isSubmitting
                                                                ? "Sending..."
                                                                : "Resend Code"
                                                        }
                                                    </button>
                                                </div>

                                                {/* Verify Button */}
                                                <motion.button
                                                    onClick={verifyOtp}
                                                    disabled={isSubmitting || otp.some(digit => digit === "")}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Verifying...</span>
                                                        </>
                                                    ) : (
                                                        <span>Verify Code</span>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Password Reset */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
                                                {/* New Password */}
                                                <div>
                                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        New Password
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Lock className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <input
                                                            id="password"
                                                            type="password"
                                                            {...passwordFormik.getFieldProps("password")}
                                                            className={`w-full pl-11 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${passwordFormik.touched.password && passwordFormik.errors.password
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                    {passwordFormik.touched.password && passwordFormik.errors.password ? (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {passwordFormik.errors.password}
                                                        </motion.p>
                                                    ) : (
                                                        <p className="mt-2 text-xs text-text-primary/40">
                                                            Must be at least 8 characters with uppercase, lowercase, number & special character
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Confirm Password */}
                                                <div>
                                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary/80 mb-2">
                                                        Confirm New Password
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                            <Lock className="w-5 h-5 text-text-primary/40" />
                                                        </div>
                                                        <input
                                                            id="confirmPassword"
                                                            type="password"
                                                            {...passwordFormik.getFieldProps("confirmPassword")}
                                                            className={`w-full pl-11 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-all ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword
                                                                ? "border-red-400/50 focus:ring-red-400/20"
                                                                : "border-text-primary/20 focus:border-text-primary/40 focus:ring-text-primary/20"
                                                                } text-text-primary/90 placeholder-text-primary/40 text-sm`}
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                    {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 text-xs text-red-500/80"
                                                        >
                                                            {passwordFormik.errors.confirmPassword}
                                                        </motion.p>
                                                    )}
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Updating...</span>
                                                        </>
                                                    ) : (
                                                        <span>Change Password</span>
                                                    )}
                                                </motion.button>
                                            </form>
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
                        Secure password reset process. Your data is protected.
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
            `}</style>
        </div>
    )
}

export default Page