"use client"

import { Camera } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProfileImageProps {
    user: {
        id: string;
        profilePhotoUrl?: string;
        firstName?: string;
        lastName?: string;
        userName?: string;
    };
    size?: "sm" | "md" | "lg";
    onEditClick: () => void;
}

const ProfileImage = ({ user, size = "lg", onEditClick }: ProfileImageProps) => {
    const sizeClasses = {
        sm: "w-14 h-14",
        md: "w-16 h-16",
        lg: "w-20 h-20"
    }

    const iconSizes = {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7"
    }

    const getInitials = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        }
        return user.userName ? user.userName.charAt(0).toUpperCase() : "U"
    }

    return (
        <div className="relative group flex-shrink-0">
            <div className={`relative rounded-xl overflow-hidden border-2 border-sky-400/30 ${sizeClasses[size]}`}>
                {user.profilePhotoUrl ? (
                    <Image
                        src={user.profilePhotoUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                        <span className={`font-bold text-white ${size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : 'text-xl'}`}>
                            {getInitials()}
                        </span>
                    </div>
                )}
            </div>

            <button
                onClick={onEditClick}
                className={`absolute -bottom-1 -right-1 bg-background/95 backdrop-blur-sm rounded-full flex items-center justify-center border border-text-primary/20 hover:bg-background transition-all duration-300 group-hover:scale-110 shadow-sm ${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'
                    }`}
            >
                <Camera className={`text-text-primary ${size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </button>
        </div>
    )
}

export default ProfileImage