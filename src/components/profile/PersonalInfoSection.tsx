// components/profile/PersonalInfoSection.tsx
"use client"

import { useState } from "react"
import { Edit2, Save, X, Mail, Phone, User } from "lucide-react"
import { toastLoading, toastUpdate } from "@/app/utils/toast-message";
import appClient from "@/lib/appClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { updateUser, User as UserProps } from "@/store/slices/authSlice";
import { uodatePersonalInformation } from "@/lib/firebase/firebaseUserCheck";


interface PersonalInfoSectionProps {
    user: UserProps;
}

const PersonalInfoSection = ({ user }: PersonalInfoSectionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        landlineNumber: user.landlineNumber || "",
        userId: user._id || ""
    })

    const dispatch = useAppDispatch()

    const handleSave = async () => {
        setIsEditing(false)

        const toastId = toastLoading("Updating...", {
            description: "We are updating your details, please wait"
        })

        try {
            const response = await appClient.post("/api/auth/personal-info", formData)


            if (response.data.status) {
                const user = response.data.updatedUser
                dispatch(updateUser({ user }))
                await uodatePersonalInformation(user)
                toastUpdate(toastId, "success", "Success", {
                    description: response.data.message || "Personal info updated successfully"
                })
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occured";
            toastUpdate(toastId, "error", "Info update error", {
                description: errorMessage || "Info update failed"
            })
        }

    }

    const handleCancel = () => {
        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
            phoneNumber: user.phoneNumber || "",
            landlineNumber: user.landlineNumber || "",
            userId: user._id || ""
        })
        setIsEditing(false)
    }

    return (
        <div className="bg-background/80 backdrop-blur-sm border border-text-primary/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sky-400 hover:text-sky-300 transition-colors duration-200 text-sm"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 transition-colors duration-200 text-sm"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-3 py-1.5 text-text-primary/70 hover:text-text-primary transition-colors duration-200 text-sm"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <User className="w-4 h-4 text-sky-400" />
                        First Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="Enter first name"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {user.firstName || "Not provided"}
                        </div>
                    )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <User className="w-4 h-4 text-sky-400" />
                        Last Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="Enter last name"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {user.lastName || "Not provided"}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Mail className="w-4 h-4 text-sky-400" />
                        Email Address
                    </label>
                    <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center justify-between">
                        <span className="truncate">{user.email}</span>
                        <div className="flex items-center gap-1 bg-emerald-400/20 text-emerald-400 px-2 py-1 rounded-full text-xs">
                            Verified
                        </div>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Phone className="w-4 h-4 text-sky-400" />
                        Phone Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="Enter phone number"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {user.phoneNumber || "Not provided"}
                        </div>
                    )}
                </div>

                {/* Landline Number */}
                <div className="space-y-2 sm:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Phone className="w-4 h-4 text-sky-400" />
                        Alternate Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={formData.landlineNumber}
                            onChange={(e) => setFormData({ ...formData, landlineNumber: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="Enter landline number"
                        />
                    ) : (
                        <div className="bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                            {user.landlineNumber || "Not provided"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoSection