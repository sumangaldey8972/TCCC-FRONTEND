"use client"

import { User } from "@/store/slices/authSlice";
import { Shield, Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface SecuritySectionProps {
    user: User;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ValidationErrors {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

interface PasswordRequirements {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

const SecuritySection = ({ user }: SecuritySectionProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [successMessage, setSuccessMessage] = useState("")
    const [apiError, setApiError] = useState("")

    // Check password requirements
    const passwordRequirements: PasswordRequirements = {
        minLength: formData.newPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(formData.newPassword),
        hasLowerCase: /[a-z]/.test(formData.newPassword),
        hasNumber: /[0-9]/.test(formData.newPassword),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.newPassword)
    }

    const isPasswordValid = Object.values(passwordRequirements).every(Boolean)

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {}

        // Current password validation
        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = "Current password is required"
        } else if (formData.currentPassword.length < 6) {
            newErrors.currentPassword = "Current password must be at least 6 characters"
        }

        // New password validation
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required"
        } else if (!isPasswordValid) {
            newErrors.newPassword = "New password does not meet requirements"
        } else if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = "New password must be different from current password"
        }

        // Confirm password validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your new password"
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof PasswordForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear specific field error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
        // Clear messages when user makes changes
        if (successMessage || apiError) {
            setSuccessMessage("")
            setApiError("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setApiError("")

        try {
            const payload = {
                password: formData.newPassword,
                userId: user._id
            }
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                    userId: user.id
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to change password')
            }

            // Success
            setSuccessMessage("Password updated successfully!")
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
            setErrors({})

        } catch (error) {
            console.error('Error changing password:', error)
            setApiError(error instanceof Error ? error.message : 'Failed to change password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
        setErrors({})
        setSuccessMessage("")
        setApiError("")
    }

    const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
        <div className="flex items-center gap-2 text-xs">
            {met ? (
                <CheckCircle className="w-3 h-3 text-emerald-400" />
            ) : (
                <XCircle className="w-3 h-3 text-text-primary/40" />
            )}
            <span className={met ? "text-emerald-400" : "text-text-primary/60"}>{text}</span>
        </div>
    )

    return (
        <div className="bg-background/80 backdrop-blur-sm border border-text-primary/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400" />
                Security
            </h2>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-3 bg-emerald-400/20 border border-emerald-400/30 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {successMessage}
                    </div>
                </div>
            )}

            {/* API Error Message */}
            {apiError && (
                <div className="mb-4 p-3 bg-red-400/20 border border-red-400/30 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                        <XCircle className="w-4 h-4" />
                        {apiError}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Current Password</label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className={`w-full bg-background border rounded-lg px-3 py-2 text-text-primary focus:outline-none transition-colors text-sm pr-10 ${errors.currentPassword
                                ? "border-red-400 focus:border-red-400"
                                : "border-text-primary/20 focus:border-sky-400"
                                }`}
                            placeholder="Enter current password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 hover:text-text-primary disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.currentPassword && (
                        <p className="text-red-400 text-xs">{errors.currentPassword}</p>
                    )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            className={`w-full bg-background border rounded-lg px-3 py-2 text-text-primary focus:outline-none transition-colors text-sm pr-10 ${errors.newPassword
                                ? "border-red-400 focus:border-red-400"
                                : "border-text-primary/20 focus:border-sky-400"
                                }`}
                            placeholder="Enter new password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 hover:text-text-primary disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Password Requirements */}
                    {formData.newPassword && (
                        <div className="bg-background/50 border border-text-primary/10 rounded-lg p-3 space-y-1">
                            <p className="text-xs font-medium text-text-primary mb-2">Password must contain:</p>
                            <div className="grid grid-cols-2 gap-1">
                                <RequirementItem met={passwordRequirements.minLength} text="At least 8 characters" />
                                <RequirementItem met={passwordRequirements.hasUpperCase} text="One uppercase letter" />
                                <RequirementItem met={passwordRequirements.hasLowerCase} text="One lowercase letter" />
                                <RequirementItem met={passwordRequirements.hasNumber} text="One number" />
                                <RequirementItem met={passwordRequirements.hasSpecialChar} text="One special character" />
                            </div>
                        </div>
                    )}

                    {errors.newPassword && (
                        <p className="text-red-400 text-xs">{errors.newPassword}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`w-full bg-background border rounded-lg px-3 py-2 text-text-primary focus:outline-none transition-colors text-sm pr-10 ${errors.confirmPassword
                                ? "border-red-400 focus:border-red-400"
                                : formData.confirmPassword && formData.newPassword === formData.confirmPassword
                                    ? "border-emerald-400 focus:border-emerald-400"
                                    : "border-text-primary/20 focus:border-sky-400"
                                }`}
                            placeholder="Confirm new password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 hover:text-text-primary disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
                    )}
                    {formData.confirmPassword && formData.newPassword === formData.confirmPassword && formData.newPassword && (
                        <p className="text-emerald-400 text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Passwords match
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading || !isPasswordValid || !formData.currentPassword || !formData.confirmPassword}
                        className="flex-1 px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>

                    {(formData.currentPassword || formData.newPassword || formData.confirmPassword) && (
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={isLoading}
                            className="px-4 py-2 border border-text-primary/20 text-text-primary rounded-lg hover:bg-text-primary/5 disabled:opacity-50 transition-colors duration-200 text-sm font-medium"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SecuritySection