export interface FormData {
    accountType: string
    fullName: string
    organizationName: string
    phoneNumber: string
    telegramUsername: string
    website: string
    description: string
    profileLink: string
    verificationToken: string,
    countryCode: string,
    userId: string
}

export interface Errors {
    [key: string]: string
}

export interface PublisherFormProps {
    setIsSubmitting: (t: boolean) => void
    setIsPublisherFormSubmitted: (t: boolean) => void
    isSubmitting: boolean,
    setIsModalOpen: (t: boolean) => void,
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export interface Step1BasicInfoProps {
    formData: FormData;
    errors: Errors;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setErrors: React.Dispatch<React.SetStateAction<Errors>>;
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