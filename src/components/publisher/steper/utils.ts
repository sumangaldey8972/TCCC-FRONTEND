// Validate phone number
export const validatePhoneNumber = (phone: string): string => {
    if (!phone.trim()) return "Phone number is required"

    // Remove all non-digit characters except plus sign
    const cleaned = phone.replace(/[^\d+]/g, '')
    const digits = cleaned.replace(/\D/g, '')

    if (digits.length < 10) return "Phone number must be at least 10 digits"
    if (digits.length > 15) return "Phone number cannot exceed 15 digits"

    return ""
}

// Validate URL
export const validateURL = (url: string, fieldName: string): string => {
    if (!url.trim()) return "" // Empty is okay for optional fields

    try {
        new URL(url)
        return ""
    } catch {
        return `Please enter a valid URL for ${fieldName}`
    }
}