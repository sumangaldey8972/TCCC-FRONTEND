import { LucideIcon } from "lucide-react"
import { FormikProps } from "formik"

export interface SocialMediaStats {
    [key: string]: {
        followers: string
        likes: string
    }
}

export interface PublisherFormValues {
    accountType: string
    fullName: string
    organizationName: string
    phoneNumber: string
    hasWhatsApp: boolean
    telegramUsername: string
    website: string
    description: string
    socialMediaStats: SocialMediaStats
}

export interface SocialMediaOption {
    id: string
    name: string
    icon: LucideIcon
    color: string
}

export const socialMediaOptions: SocialMediaOption[] = [
    { id: "whatsapp", name: "WhatsApp", icon: MessageSquare, color: "#25D366" },
    { id: "telegram", name: "Telegram", icon: MessageSquare, color: "#0088cc" },
    { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "#000000" },
    { id: "tiktok", name: "TikTok", icon: Music, color: "#000000" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
]

export interface StepProps {
    formik?: FormikProps<PublisherFormValues>
    selectedSocialMedia?: string[]
    toggleSocialMedia?: (platformId: string) => void
    isSubmitting?: boolean
    verificationStatus?: 'pending' | 'verifying' | 'verified' | 'failed'
    verificationSkipped?: boolean
    setVerificationStatus?: (status: 'pending' | 'verifying' | 'verified' | 'failed') => void
    setVerificationSkipped?: (skipped: boolean) => void
    onSubmit?: () => void
}

import {
    MessageSquare,
    Twitter,
    Youtube,
    Music,
    Facebook,
    Instagram,
    Linkedin
} from "lucide-react"