"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import ProfileImage from "./ProfileHeader/ProfileImage";
import UserInfo from "./ProfileHeader/UserInfo";
import StatusBadges from "./ProfileHeader/StatusBadges";
import WalletInfo from "./ProfileHeader/WalletInfo";
import ImageUploadModal from "./ProfileHeader/ImageUpload";
import { updateUser, User } from "@/store/slices/authSlice";
import appClient from "@/lib/appClient";
import { useAppDispatch } from "@/store/hooks/hooks";
import { toastLoading, toastUpdate } from "@/app/utils/toast-message";
import { updateUserPhotoUrl } from "@/lib/firebase/firebaseUserCheck";


interface ProfileHeaderProps {
    user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    const router = useRouter()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const dispatch = useAppDispatch()


    const handleKycClick = () => {
        if (user.kycStatus !== "approved") {
            router.push("/kyc")
        }
    }

    const handleImageEditClick = () => {
        setIsImageModalOpen(true)
    }

    const handleImageSave = async (file: File) => {
        setIsUploading(true)

        const toastId = toastLoading("Uploading...", {
            description: "We are uploading your image, please wait.."
        })

        try {
            console.log(file, user?._id)
            const formData = new FormData()
            formData.append('profileImage', file)
            formData.append('userId', String(user._id))

            const response = await appClient.post('/api/auth/profile-picture', formData)

            console.log("Image upload successfull", response)

            if (response.data.status) {
                const user = response.data.updateUser

                await updateUserPhotoUrl(user.userName, user.profilePhotoUrl)

                dispatch(updateUser({ user })) // update redux store
                setIsImageModalOpen(false) // close modal
                toastUpdate(toastId, "success", "Image is updated", {
                    description: response.data.message || ""
                }) // success message
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occured"
            toastUpdate(toastId, "error", "Image uploadation failed", {
                description: errorMessage || "Image uploadation failed"
            })
        } finally {
            setIsUploading(false)
        }
    }

    const handleModalClose = () => {
        setIsImageModalOpen(false)
    }

    return (
        <>
            <div className="bg-background/80 backdrop-blur-sm border border-text-primary/10 rounded-2xl overflow-hidden">
                {/* MOBILE LAYOUT */}
                <div className="block md:hidden">
                    <div className="p-4 border-b border-text-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                            <ProfileImage
                                user={user}
                                size="sm"
                                onEditClick={handleImageEditClick}
                            />
                            <UserInfo user={user} layout="mobile" />
                        </div>

                        <StatusBadges
                            isVerified={user.isVerified}
                            kycStatus={user.kycStatus}
                            onKycClick={handleKycClick}
                            size="sm"
                        />
                    </div>

                    {/* <WalletInfo walletBalance={user.walletBalance} layout="mobile" /> */}
                </div>

                {/* TABLET LAYOUT */}
                <div className="hidden md:block lg:hidden">
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex items-start gap-4 flex-1">
                                <ProfileImage
                                    user={user}
                                    size="md"
                                    onEditClick={handleImageEditClick}
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <UserInfo user={user} layout="tablet" />
                                    </div>

                                    <StatusBadges
                                        isVerified={user.isVerified}
                                        kycStatus={user.kycStatus}
                                        onKycClick={handleKycClick}
                                        size="md"
                                    />
                                </div>
                            </div>

                            {/* <WalletInfo walletBalance={user.walletBalance} layout="tablet" /> */}
                        </div>
                    </div>
                </div>

                {/* DESKTOP LAYOUT */}
                <div className="hidden lg:block">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <ProfileImage
                                    user={user}
                                    size="lg"
                                    onEditClick={handleImageEditClick}
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-2">
                                        <UserInfo user={user} layout="desktop" />

                                        <StatusBadges
                                            isVerified={user.isVerified}
                                            kycStatus={user.kycStatus}
                                            onKycClick={handleKycClick}
                                            size="lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <WalletInfo walletBalance={user.walletBalance} layout="desktop" /> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Upload Modal */}
            <ImageUploadModal
                isUploading={isUploading}
                isOpen={isImageModalOpen}
                onClose={handleModalClose}
                onSave={handleImageSave}
                currentImage={user.profilePhotoUrl}
                user={user}
            />
        </>
    )
}

export default ProfileHeader