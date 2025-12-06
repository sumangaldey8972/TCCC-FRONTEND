"use client"

import { useState, forwardRef } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"


import { ArrowLeft, ArrowRight } from "lucide-react"
import { Errors, FormData, PublisherFormProps } from "@/type/publisher.type"
import Step1BasicInfo from "./steper/Step1BasicInfo"
import Step2Verification from "./steper/Step2Verification"
import StepProgress from "./steper/StepProgress"
import { validatePhoneNumber, validateURL } from "./steper/utils"



const PublisherForm = forwardRef<HTMLDivElement, PublisherFormProps>(({
    setIsSubmitting,
    setIsPublisherFormSubmitted,
    isSubmitting
}, ref) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [verificationSkipped, setVerificationSkipped] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending')

    // Form state
    const [formData, setFormData] = useState<FormData>({
        accountType: "individual",
        fullName: "",
        organizationName: "",
        phoneNumber: "",
        hasWhatsApp: false,
        telegramUsername: "",
        website: "",
        description: "",
        profileLink: "",
    })

    // Errors state
    const [errors, setErrors] = useState<Errors>({})

    // Handle step navigation
    const nextStep = () => {
        if (currentStep === 1) {
            const isValid = validateStep1()
            if (isValid) {
                if (!completedSteps.includes(1)) {
                    setCompletedSteps([...completedSteps, 1])
                }
                setCurrentStep(2)
            }
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        key="step1"
                        formData={formData}
                        errors={errors}
                        setFormData={setFormData}
                        setErrors={setErrors}
                    />
                )
            case 2:
                return (
                    <Step2Verification
                        key="step2"
                        formData={formData}
                        isSubmitting={isSubmitting}
                        verificationStatus={verificationStatus}
                        verificationSkipped={verificationSkipped}
                        setVerificationStatus={setVerificationStatus}
                        setVerificationSkipped={setVerificationSkipped}
                        setIsSubmitting={setIsSubmitting}
                        setIsPublisherFormSubmitted={setIsPublisherFormSubmitted}
                    />
                )
            default:
                return null
        }
    }

    // Validate step 1
    const validateStep1 = () => {
        const newErrors: Errors = {}

        // Name validation based on account type
        if (formData.accountType === "individual") {
            if (!formData.fullName.trim()) {
                newErrors.fullName = "Full name is required"
            }
        } else {
            if (!formData.organizationName.trim()) {
                newErrors.organizationName = "Organization name is required"
            }
        }

        // Phone validation
        const phoneError = validatePhoneNumber(formData.phoneNumber)
        if (phoneError) {
            newErrors.phoneNumber = phoneError
        }

        // Website validation (optional)
        if (formData.website.trim()) {
            const websiteError = validateURL(formData.website, "website")
            if (websiteError) {
                newErrors.website = websiteError
            }
        }

        // Profile link validation (optional)
        if (formData.profileLink.trim()) {
            const profileLinkError = validateURL(formData.profileLink, "profile link")
            if (profileLinkError) {
                newErrors.profileLink = profileLinkError
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

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

                <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-text-primary/10">
                    {/* Form Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                            Publisher Application
                        </h2>
                        <p className="text-text-primary/60 text-sm">
                            Complete your publisher profile to start monetizing
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <StepProgress
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                    />

                    <div>
                        {renderStepContent()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-text-primary/10">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1 || isSubmitting}
                                className="text-sm px-6 py-3 border border-text-primary/20 hover:border-text-primary/40 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary/70 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-primary/20 flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </button>

                            {currentStep === 1 && (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                    className="text-sm px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center gap-2"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Progress Info */}
                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-text-primary/80">
                                        Step {currentStep} of 2
                                    </p>
                                    <p className="text-xs text-text-primary/60 mt-1">
                                        {currentStep === 1 ? 'Tell us about yourself' : 'Verify your website'}
                                    </p>
                                    {currentStep === 1 && (
                                        <p className="text-xs text-text-primary/40 mt-1">
                                            * Required fields must be filled correctly
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-text-primary/60">
                                        {completedSteps.length}/2 steps completed
                                    </p>
                                    <div className="w-32 h-2 bg-text-primary/10 rounded-full overflow-hidden mt-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(completedSteps.length / 2) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

PublisherForm.displayName = "PublisherForm"

export default PublisherForm
