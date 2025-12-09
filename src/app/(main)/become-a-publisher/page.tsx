"use client"

import { useState, useRef, useEffect } from "react"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "@/providers/ThemeProvider"
import PixelGrid from "@/components/publisher/PixelGrid"
import FloatingParticles from "@/components/publisher/FloatingParticles"
import LeftContent from "@/components/publisher/LeftContent"
import RightForm from "@/components/publisher/RightForm"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Lock, Shield } from "lucide-react"
import ApplicationStatus from "@/components/publisher/ApplicationStatus"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks/hooks"
import PublisherFormVTwo from "@/components/publisher/PublisherFormVTwo"
import VerificationModal from "@/components/publisher/steper/Step2VerificationModal"
import { FormData } from "@/type/publisher.type"

const PublisherPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    const { theme } = useTheme()

    // Auth state variables - in real app, these would come from auth context/API
    const [isAuthed, setIsAuthed] = useState(true) // Set to false to show login/signup form
    const [isPublisherFormSubmitted, setIsPublisherFormSubmitted] = useState(false)
    const [isPublisherVerified, setIsPublisherVerified] = useState(false)

    const [verificationSkipped, setVerificationSkipped] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending')

    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const user = useAppSelector((store) => store.auth.user)

    // Form state
    const [formData, setFormData] = useState<FormData>({
        accountType: "individual",
        fullName: "",
        organizationName: "",
        phoneNumber: "",
        countryCode: "+91",
        telegramUsername: "",
        website: "",
        description: "",
        profileLink: "",
        verificationToken: "",
        userId: user?._id || ""
    })


    useEffect(() => {
        if (user?.isPublisherFormSubmitted) {
            setIsPublisherFormSubmitted(true)
        }
    }, [user])


    // 3D Animation Effect (only for form)
    useEffect(() => {
        if (!formRef.current) return

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = formRef.current!.getBoundingClientRect()
            const x = (e.clientX - left) / width
            const y = (e.clientY - top) / height

            formRef.current!.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`
        }

        const formElement = formRef.current
        formElement.addEventListener("mousemove", handleMouseMove)

        return () => {
            formElement.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])



    // Render different content based on auth state
    const renderRightContent = () => {

        // Case 2: Authenticated but publisher form not submitted
        if (isAuthed && !isPublisherFormSubmitted) {
            return (
                <div className="relative">
                    {/* Main Form */}
                    <PublisherFormVTwo
                        isSubmitting={isSubmitting}
                        ref={formRef}
                        setIsSubmitting={setIsSubmitting}
                        setIsPublisherFormSubmitted={setIsPublisherFormSubmitted}
                        setIsModalOpen={setIsModalOpen}
                        formData={formData}
                        setFormData={setFormData}
                    />

                    {/* Authentication Overlay */}
                    <AnimatePresence>
                        {!user && (
                            <>
                                {/* Blur Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-background/40 dark:bg-black/40 z-10 rounded-xl"
                                />

                                {/* Authentication Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <div className="max-w-md mx-auto space-y-6">
                                        {/* Icon */}
                                        <div className="relative">
                                            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse" /> */}
                                            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-text-primary/10 to-purple-500/10 border-2 border-text-primary/20 flex items-center justify-center">
                                                <Lock className="w-10 h-10 text-text-primary" />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                Become a Publisher
                                            </h3>
                                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                                Sign up to unlock publisher features and start monetizing your content
                                            </p>
                                        </div>

                                        {/* Benefits List */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span>Secure publisher dashboard</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span>Verified badge for trusted publishers</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                                <span>Premium analytics and insights</span>
                                            </div>
                                        </div>

                                        {/* Call to Action */}
                                        <div className="pt-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    // Redirect to sign up page
                                                    router.push('/auth/sign-up')

                                                }}
                                                className="group relative px-8 py-4 bg-text-primary text-background font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                            >
                                                <span className="relative flex items-center justify-center gap-3">
                                                    Sign Up to Get Started
                                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </span>
                                            </motion.button>

                                            {/* Already have account */}
                                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                Already have an account?{" "}
                                                <button
                                                    onClick={() => {
                                                        // Redirect to login page
                                                        router.push('/auth/log-in')
                                                    }}
                                                    className="text-text-primary font-medium hover:underline"
                                                >
                                                    Sign in here
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

            )
        }

        // Case 3: Authenticated, publisher form submitted, but not verified
        if (isAuthed && isPublisherFormSubmitted && !isPublisherVerified) {
            return (
                <ApplicationStatus />
            )
        }

        // Case 4: All conditions met - user is verified publisher
        // This would typically redirect to dashboard or show success screen
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
            >
                <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-green-500/20 via-green-600/30 to-green-500/20 animate-gradient-x">
                    <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 mb-6">
                            <CheckCircle className="w-8 h-8 text-green-500/80" />
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                            Welcome to the Publisher Network!
                        </h2>
                        <p className="text-text-primary/60 mb-6">
                            Your account is fully verified and ready to start monetizing.
                        </p>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500/30"
                        >
                            Go to Publisher Dashboard
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Sparkles Background */}
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={50}
                    className="w-full h-full"
                    particleColor={theme === "light" ? "#000000" : "#FFFFFF"}
                />
            </div>

            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <PixelGrid />
                <FloatingParticles />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        <LeftContent />

                        <div className="lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
                            {renderRightContent()}
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

                @keyframes shine {
                    0% {
                        background-position: -100% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }

                .animate-shine {
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    background-size: 200% 100%;
                    animation: shine 3s ease-in-out infinite;
                }
            `}</style>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                verificationStatus={verificationStatus}
                verificationSkipped={verificationSkipped}
                setVerificationStatus={setVerificationStatus}
                setVerificationSkipped={setVerificationSkipped}
            />
        </div>
    )
}

export default PublisherPage