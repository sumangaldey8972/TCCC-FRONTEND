"use client"

import { useState, useRef, useEffect } from "react"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "@/providers/ThemeProvider"
import PixelGrid from "@/components/publisher/PixelGrid"
import FloatingParticles from "@/components/publisher/FloatingParticles"
import LeftContent from "@/components/publisher/LeftContent"
import RightForm from "@/components/publisher/RightForm"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import ApplicationStatus from "@/components/publisher/ApplicationStatus"
import PublisherForm from "@/components/publisher/PublisherForm"
import { useRouter } from "next/navigation"

const PublisherPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    const { theme } = useTheme()

    // Auth state variables - in real app, these would come from auth context/API
    const [isAuthed, setIsAuthed] = useState(true) // Set to false to show login/signup form
    const [isPublisherFormSubmitted, setIsPublisherFormSubmitted] = useState(false)
    const [isPublisherVerified, setIsPublisherVerified] = useState(false)

    const router = useRouter()

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

    const handleSubmit = async (values: any) => {
        setIsSubmitting(true)
        try {
            // API Call Simulation
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log("Form submitted:", {
                email: values.email,
                type: values.type
            })

            // Simulate successful authentication
            setIsAuthed(true)
            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 3000)
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }



    // Render different content based on auth state
    const renderRightContent = () => {
        // Case 1: Not authenticated - show login/signup form
        if (!isAuthed) {
            return (
                <RightForm
                    ref={formRef}
                    isSubmitting={isSubmitting}
                    submitSuccess={submitSuccess}
                    onSubmit={handleSubmit}
                />
            )
        }

        // Case 2: Authenticated but publisher form not submitted
        if (isAuthed && !isPublisherFormSubmitted) {
            return (
                <PublisherForm isSubmitting={isSubmitting} ref={formRef} setIsSubmitting={setIsSubmitting} setIsPublisherFormSubmitted={setIsPublisherFormSubmitted} />
                // router.push("/become-a-publisher/start-your-journey")

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
        </div>
    )
}

export default PublisherPage