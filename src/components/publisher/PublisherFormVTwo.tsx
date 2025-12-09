"use client"

import { useState, forwardRef } from "react"
import { motion } from "framer-motion"


import { ArrowRight } from "lucide-react"
import { Errors, PublisherFormProps } from "@/type/publisher.type"
import Step1BasicInfo from "./steper/Step1BasicInfo"
import { validatePhoneNumber, validateURL } from "./steper/utils"
import { useAppDispatch } from "@/store/hooks/hooks"
import appClient from "@/lib/appClient"
import { updateUser } from "@/store/slices/authSlice"
import { toastLoading, toastUpdate } from "@/app/utils/toast-message"



const PublisherFormVTwo = forwardRef<HTMLDivElement, PublisherFormProps>(({
    setIsSubmitting,
    isSubmitting,
    setIsModalOpen,
    formData,
    setFormData
}, ref) => {

    const dispatch = useAppDispatch()

    // Errors state
    const [errors, setErrors] = useState<Errors>({})

    // Handle step navigation
    const handleSubmit = async () => {

        const isValid = validateStep1()
        if (isValid) {

            setIsSubmitting(true)
            const toastId = toastLoading("Creating..", {
                description: "Adding publisher details"
            })

            try {
                const response = await appClient.post("/api/publisher/create", formData)
                if (response.data.status) {

                    const user = response.data.user
                    dispatch(updateUser({ user }))


                    if (formData.website) {
                        setIsModalOpen(true)
                        formData.verificationToken = response.data.newPublisher.verificationToken
                    }

                    toastUpdate(toastId, "success", "Success", {
                        description: response.data.message
                    })
                } else {
                    toastUpdate(toastId, "error", "Failed", {
                        description: response.data.message
                    })
                }
                setIsSubmitting(false)
            } catch (error) {
                setIsSubmitting(false)
                console.log("error", error)
            }



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
        <>
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

                        <div>
                            <Step1BasicInfo
                                key="step1"
                                formData={formData}
                                errors={errors}
                                setFormData={setFormData}
                                setErrors={setErrors}
                            />

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-text-primary/10">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="text-sm px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center gap-2"
                                >
                                    Submit Application
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
})

PublisherFormVTwo.displayName = "PublisherFormVTwo"

export default PublisherFormVTwo
