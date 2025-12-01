// app/profile/page.tsx
"use client"

import { useAppSelector } from "@/store/hooks/hooks"
import ProfileHeader from "@/components/profile/ProfileHeader"
import PersonalInfoSection from "@/components/profile/PersonalInfoSection"
import AddressSection from "@/components/profile/AddressSection"
import CryptoSection from "@/components/profile/CryptoSection"
import SecuritySection from "@/components/profile/SecuritySection"

const ProfilePage = () => {
    const authedUser = useAppSelector((state) => state.auth.user)

    if (!authedUser) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary">Please login to view profile</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background pb-8">
            <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6">
                {/* Profile Header */}
                <ProfileHeader user={authedUser} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Personal & Security */}
                    <div className="lg:col-span-2 space-y-6">
                        <PersonalInfoSection user={authedUser} />
                        <AddressSection user={authedUser} />
                    </div>

                    {/* Right Column - Crypto & Security */}
                    <div className="space-y-6">
                        <CryptoSection user={authedUser} />
                        <SecuritySection user={authedUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage