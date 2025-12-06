export interface FormData {
    accountType: string
    fullName: string
    organizationName: string
    phoneNumber: string
    hasWhatsApp: boolean
    telegramUsername: string
    website: string
    description: string
    profileLink: string
    verificationToken: string
}

export interface Errors {
    [key: string]: string
}

export interface PublisherFormProps {
    setIsSubmitting: (t: boolean) => void
    setIsPublisherFormSubmitted: (t: boolean) => void
    isSubmitting: boolean
}

export interface Step1BasicInfoProps {
    formData: FormData
    errors: Errors
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
}

export interface Step2VerificationProps {
    formData: FormData
    isSubmitting: boolean
    verificationStatus: 'pending' | 'verifying' | 'verified' | 'failed'
    verificationSkipped: boolean
    setVerificationStatus: (status: 'pending' | 'verifying' | 'verified' | 'failed') => void
    setVerificationSkipped: (skipped: boolean) => void
    setIsSubmitting: (t: boolean) => void
    setIsPublisherFormSubmitted: (t: boolean) => void
}

export interface StepProgressProps {
    currentStep: number
    completedSteps: number[]
}