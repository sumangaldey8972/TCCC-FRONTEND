"use client"

import { forwardRef, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

interface RightFormProps {
    isSubmitting: boolean
    submitSuccess: boolean
    onSubmit: (values: any) => Promise<void>
}

const RightForm = forwardRef<HTMLDivElement, RightFormProps>(({
    isSubmitting,
    submitSuccess,
    onSubmit
}, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const router = useRouter()

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
            await onSubmit(values)
        }
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
        >
            <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-text-primary/20 via-text-primary/40 to-text-primary/20 animate-gradient-x">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-text-primary/10 to-transparent animate-shine" />

                <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-text-primary/10">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                            Publisher | Sign Up
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
                                    Sign Up
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-text-primary/10">
                            <p className="text-text-primary/50 text-base">
                                Already have an account?{" "}
                                <span onClick={() => router.push("/auth/log-in")} className="cursor-pointer text-text-primary/70 hover:text-text-primary/90 transition-colors font-medium">
                                    Sign In
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
})

RightForm.displayName = "RightForm"

export default RightForm