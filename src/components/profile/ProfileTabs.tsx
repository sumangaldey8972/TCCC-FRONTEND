// components/profile/ProfileTabs.tsx
"use client"

import { User, Shield, MapPin, Coins, Lock } from "lucide-react"

interface ProfileTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "kyc", label: "KYC Verification", icon: Shield },
    { id: "address", label: "Address", icon: MapPin },
    { id: "crypto", label: "Crypto Details", icon: Coins },
    { id: "security", label: "Security", icon: Lock },
]

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    return (
        <div className="border-b border-text-primary/10">
            <div className="flex overflow-x-auto scrollbar-hide">
                <div className="flex space-x-1 min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 ${activeTab === tab.id
                                    ? "border-sky-400 text-sky-400 bg-sky-400/5"
                                    : "border-transparent text-text-primary/60 hover:text-text-primary hover:bg-text-primary/5"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProfileTabs