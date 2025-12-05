"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion, AnimatePresence } from "framer-motion"
import { forwardRef } from "react"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import { PublisherFormValues, socialMediaOptions, SocialMediaStats } from "@/type/publisher.type"
import Step1BasicInfo from "./stepper/Step1BasicInfo"
import Step2TrafficSources from "./stepper/Step2TrafficSources"
import Step3AudienceDetails from "./stepper/Step3AudienceDetails"
import Step4Verification from "./stepper/Step4Verification"
import StepProgress from "./stepper/StepProgress"

interface PublisherFormProps {
    setIsSubmitting: (t: boolean) => void;
    setIsPublisherFormSubmitted: (t: boolean) => void;
    isSubmitting: boolean
}

// Step configurations
const steps = [
    { id: 1, title: "Basic Info", description: "Tell us about yourself" },
    { id: 2, title: "Traffic Sources", description: "Select your social platforms" },
    { id: 3, title: "Audience Details", description: "Provide follower counts" },
    { id: 4, title: "Verification", description: "Verify your website" },
]

const PublisherForm = forwardRef<HTMLDivElement, PublisherFormProps>(({
    setIsSubmitting,
    setIsPublisherFormSubmitted,
    isSubmitting
}, ref) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([])
    const [verificationSkipped, setVerificationSkipped] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending')

    // Formik setup
    const formik = useFormik<PublisherFormValues>({
        initialValues: {
            // Step 1
            accountType: "individual",
            fullName: "",
            organizationName: "",
            phoneNumber: "",
            hasWhatsApp: false,
            telegramUsername: "",
            website: "",
            description: "",

            // Step 3 (dynamic based on selected social media)
            socialMediaStats: {} as SocialMediaStats,
        },
        validationSchema: Yup.object({
            // Step 1 validation
            accountType: Yup.string().oneOf(["individual", "company"]).required("Account type is required"),
            fullName: Yup.string().when('accountType', {
                is: 'individual',
                then: schema => schema.required('Full name is required for individuals'),
                otherwise: schema => schema.notRequired()
            }),
            organizationName: Yup.string().when('accountType', {
                is: 'company',
                then: schema => schema.required('Organization name is required for companies'),
                otherwise: schema => schema.notRequired()
            }),
            phoneNumber: Yup.string()
                .matches(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number')
                .required('Phone number is required'),
            telegramUsername: Yup.string(),
            website: Yup.string()
                .url('Please enter a valid URL')
                .required('Website is required'),
            description: Yup.string()
                .min(50, 'Description must be at least 50 characters')
                .max(500, 'Description cannot exceed 500 characters')
                .required('Description is required'),

            // Step 3 validation (dynamic)
            socialMediaStats: Yup.object()
                .shape({})
                .test(
                    'social-media-stats',
                    'Please provide follower counts for selected platforms',
                    function (value: Record<string, { followers?: string }>) {
                        if (currentStep < 3) return true;

                        for (const platform of selectedSocialMedia) {
                            const followers = value?.[platform]?.followers;

                            if (!followers || !/^\d+$/.test(followers)) {
                                return this.createError({
                                    path: `socialMediaStats.${platform}.followers`,
                                    message: `${socialMediaOptions.find(p => p.id === platform)?.name} followers count is required`,
                                });
                            }
                        }

                        return true;
                    }
                )

        }),
        onSubmit: async (values) => {
            setIsSubmitting(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500))

                // Prepare final submission data
                const submissionData = {
                    ...values,
                    selectedSocialMedia,
                    verificationSkipped,
                    verificationStatus,
                    submittedAt: new Date().toISOString()
                }

                console.log("Publisher form submitted:", submissionData)
                setIsPublisherFormSubmitted(true)
            } catch (error) {
                console.error("Error submitting publisher form:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    })

    // Handle step navigation
    const nextStep = async () => {
        const stepFields = getStepFields(currentStep)

        // Validate current step
        // if (currentStep === 2 && selectedSocialMedia.length === 0) {
        //     return // Can't proceed without selecting at least one social media
        // }

        // Validate form fields for current step
        if (stepFields.length > 0) {
            await formik.validateForm()
            const stepErrors = stepFields.filter(field => formik.errors[field as keyof typeof formik.errors])
            if (stepErrors.length > 0) {
                return
            }
        }

        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep])
        }
        setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    // Get fields for each step
    const getStepFields = (step: number): string[] => {
        switch (step) {
            case 1: return ['accountType', 'fullName', 'organizationName', 'phoneNumber', 'website', 'description']
            case 2: return [] // No form fields, just selection
            case 3: return ['socialMediaStats']
            default: return []
        }
    }

    // Handle social media selection
    const toggleSocialMedia = (platformId: string) => {
        const newSelected = selectedSocialMedia.includes(platformId)
            ? selectedSocialMedia.filter(id => id !== platformId)
            : [...selectedSocialMedia, platformId]

        setSelectedSocialMedia(newSelected)

        // Initialize or remove stats for platform
        if (!selectedSocialMedia.includes(platformId)) {
            formik.setFieldValue(`socialMediaStats.${platformId}`, { followers: '', likes: '' })
        } else {
            // Remove stats when platform is deselected
            const { [platformId]: removed, ...rest } = formik.values.socialMediaStats
            formik.setFieldValue('socialMediaStats', rest)
        }
    }

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        key="step1"
                        formik={formik}
                    />
                )
            case 2:
                return (
                    <Step2TrafficSources
                        key="step2"
                        selectedSocialMedia={selectedSocialMedia}
                        toggleSocialMedia={toggleSocialMedia}
                    />
                )
            case 3:
                return (
                    <Step3AudienceDetails
                        key="step3"
                        formik={formik}
                        selectedSocialMedia={selectedSocialMedia}
                    />
                )
            case 4:
                return (
                    <Step4Verification
                        key="step4"
                        formik={formik}
                        isSubmitting={isSubmitting}
                        verificationStatus={verificationStatus}
                        verificationSkipped={verificationSkipped}
                        setVerificationStatus={setVerificationStatus}
                        setVerificationSkipped={setVerificationSkipped}
                        onSubmit={formik.handleSubmit}
                    />
                )
            default:
                return null
        }
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

                <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-text-primary/10">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 mb-4">
                            <Mail className="w-8 h-8 text-blue-500/80" />
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                            Publisher Application
                        </h2>
                        <p className="text-text-primary/60 text-sm">
                            Complete your publisher profile to start monetizing
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <StepProgress
                        steps={steps}
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                    />

                    <form onSubmit={formik.handleSubmit}>
                        <AnimatePresence mode="wait">
                            {renderStepContent()}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        {currentStep < 5 && (
                            <div className="flex justify-between mt-8 pt-6 border-t border-text-primary/10">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1 || isSubmitting}
                                    className="px-6 py-3 border border-text-primary/20 hover:border-text-primary/40 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary/70 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-primary/20 flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={
                                        // (currentStep === 2 && selectedSocialMedia.length === 0) ||
                                        (currentStep === 4) ||
                                        isSubmitting
                                    }
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center gap-2"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Progress Info */}
                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-text-primary/80">
                                        Step {currentStep} of {steps.length}
                                    </p>
                                    <p className="text-xs text-text-primary/60 mt-1">
                                        {steps[currentStep - 1]?.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-text-primary/60">
                                        {completedSteps.length}/{steps.length} steps completed
                                    </p>
                                    <div className="w-32 h-2 bg-text-primary/10 rounded-full overflow-hidden mt-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
})

PublisherForm.displayName = "PublisherForm"

export default PublisherForm