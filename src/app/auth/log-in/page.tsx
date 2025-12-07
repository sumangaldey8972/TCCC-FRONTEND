"use client"

import { useState, useRef } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, Eye, EyeOff, Key, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks/hooks"
import appClient from "@/lib/appClient"
import { toastLoading, toastUpdate } from "@/app/utils/toast-message"
import { signin } from "@/store/slices/authSlice"

const Page = () => {

    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            acceptTerms: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
            acceptTerms: Yup.boolean()
                .oneOf([true], "You must accept the terms and conditions")
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const toastId = toastLoading("Signing in...", {
                description: "Checking your credentials, please wait"
            })

            try {
                const res = await appClient.post("/api/auth/signIn", values)

                if (res.data.status) {
                    const user = res.data.user
                    toastUpdate(toastId, "success", "Sign in successfull", {
                        description: res.data.message || "Signed in,"
                    })
                    router.push("/become-a-publisher")
                    dispatch(signin({ user }))
                    setIsSubmitting(false)
                } else {
                    toastUpdate(toastId, "error", "Sign in error", {
                        description: res.data.message || "Signed in,"
                    })
                    setIsSubmitting(false)
                }

            } catch (error) {
                console.log("this is an error while sign in", error)
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
            <div className="flex items-center justify-center p-4 md:p-8">
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
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-text-primary/10 to-text-primary/5 mb-4">
                                        <Key className="w-6 h-6 text-text-primary/80" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-text-primary/90 mb-2">
                                        Log In
                                    </h2>
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
                                            <p className="font-medium text-green-500">Login Successful!</p>
                                            <p className="text-xs text-green-500/70">Redirecting...</p>
                                        </div>
                                    </motion.div>
                                )}

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
                                        {formik.touched.password && formik.errors.password && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-xs text-red-500/80"
                                            >
                                                {formik.errors.password}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Remember & Forgot Section */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <input
                                                id="acceptTerms"
                                                type="checkbox"
                                                {...formik.getFieldProps("acceptTerms")}
                                                className="w-4 h-4 rounded border-text-primary/30 text-text-primary/60 focus:ring-text-primary/30"
                                            />
                                            <label htmlFor="acceptTerms" className="text-sm text-text-primary/60">
                                                Remember me
                                            </label>
                                        </div>
                                        <p
                                            onClick={() => router.push("/auth/forgot-password")}
                                            className="text-sm text-text-primary/70 hover:text-text-primary/90 transition-colors cursor-pointer"
                                        >
                                            Forgot password?
                                        </p>
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
                                        className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 text-background font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Log In</span>
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Registration Link */}
                                    <div className="text-center pt-6 border-t border-text-primary/10">
                                        <p className="text-text-primary/60 text-sm">
                                            Don't have an account?{" "}
                                            <span
                                                onClick={() => router.push("/auth/sign-up")}
                                                className="text-text-primary/80 hover:text-text-primary font-medium transition-colors cursor-pointer"
                                            >
                                                Sign Up
                                            </span>
                                        </p>
                                    </div>
                                </form>
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
                @keyframes pixelGlow {
                    0%, 100% {
                        opacity: 0.05;
                        background-color: rgba(4, 7, 32, 0.03);
                    }
                    50% {
                        opacity: 0.15;
                        background-color: rgba(4, 7, 32, 0.08);
                    }
                }
                
                .pixel-grid-container {
                    display: grid;
                    grid-template-columns: repeat(15, 1fr);
                    grid-template-rows: repeat(15, 1fr);
                }
                
                .pixel-cell {
                    border: 0.5px solid rgba(4, 7, 32, 0.03);
                    animation: pixelGlow infinite ease-in-out;
                }

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