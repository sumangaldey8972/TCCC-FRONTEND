// components/navigation/ProfileDropdown.tsx
"use client";

import { useState } from "react";
import { User, FileCheck, LogOut, Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    userName: string;
    isVerified: boolean;
    kycStatus: string;
    email: string;
    role: string;
    refreshToken: string;
    profilePicture: string;
}

interface ProfileDropdownProps {
    user: User | null;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onLogout: () => Promise<void>; // Add this prop
}

const ProfileDropdown = ({ user, isOpen, onToggle, onClose, onLogout }: ProfileDropdownProps) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const router = useRouter()

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await onLogout(); // Call the parent's logout function
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
            // onClose();
        }
    };

    const getInitial = (name: string) => {
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    const handleItemClick = (link: string) => {
        router.push(link);
    }

    if (!user) return null;

    return (
        <div className="relative">
            {/* Profile Trigger Button */}
            <button
                onClick={onToggle}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-text-primary/10 transition-all duration-200 group cursor-pointer border border-transparent hover:border-text-primary/20"
            >
                {/* Profile Picture / Avatar */}
                <div className="relative">
                    {user.profilePicture ? (
                        <Image
                            src={user.profilePicture}
                            alt={user.userName}
                            width={32}
                            height={32}
                            className="rounded-full border border-sky-400/30 object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {getInitial(user.userName)}
                        </div>
                    )}
                </div>

                {/* User Info - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-text-primary flex items-center gap-1">
                        {user.userName}
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>

                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-background/95 backdrop-blur-sm border border-text-primary/20 rounded-xl shadow-2xl py-2 z-50">
                    {/* User Summary */}
                    <div className="px-4 py-3 border-b border-text-primary/10">
                        <div className="text-sm font-semibold text-text-primary truncate">
                            {user.userName}
                        </div>
                        <div className="text-xs text-text-primary/60 truncate">
                            {user.email}
                        </div>
                    </div>

                    {/* Menu Items */}
                    {/* <div className="py-2">

                    </div> */}

                    {/* Logout Button */}
                    <div className="border-t border-text-primary/10 pt-2">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 transition-colors duration-200 disabled:opacity-50"
                        >
                            <LogOut className="w-4 h-4" />
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Dropdown Item Component
const DropdownItem = ({
    icon,
    label,
    onClick,
    badge
}: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    badge?: string;
}) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-2 text-text-primary/70 hover:text-sky-400 hover:bg-sky-400/5 transition-colors duration-200"
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-sm">{label}</span>
        </div>
        {badge && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                {badge}
            </span>
        )}
    </button>
);

export default ProfileDropdown;