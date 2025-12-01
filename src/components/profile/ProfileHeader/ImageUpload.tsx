"use client"

import { X, Upload, Camera } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface ImageUploadModalProps {
    isUploading: boolean;
    isOpen: boolean;
    onClose: () => void;
    onSave: (file: File) => void;
    currentImage?: string;
    user: {
        firstName?: string;
        lastName?: string;
        userName?: string;
    };
}

const ImageUploadModal = ({ isUploading, isOpen, onClose, onSave, currentImage, user }: ImageUploadModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    if (!isOpen) return null

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB')
            return
        }

        setSelectedImage(file)
        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)

        const file = event.dataTransfer.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleSave = () => {
        if (selectedImage) {
            onSave(selectedImage)
        }
    }

    const handleClose = () => {
        setSelectedImage(null)
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
            setImagePreview(null)
        }
        onClose()
    }

    const getInitials = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        }
        return user.userName ? user.userName.charAt(0).toUpperCase() : "U"
    }

    const displayImage = imagePreview || currentImage

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-2xl w-full max-w-md border border-text-primary/10">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-text-primary/10">
                    <h2 className="text-xl font-bold text-text-primary">Update Profile Picture</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-text-primary/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-text-primary" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Current Preview */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-sky-400/30">
                            {displayImage ? (
                                <Image
                                    src={displayImage}
                                    alt="Profile preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {getInitials()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upload Area */}
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
                            ? 'border-sky-400 bg-sky-400/10'
                            : 'border-text-primary/20 hover:border-text-primary/40'
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInputChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-sky-400/10 rounded-full flex items-center justify-center">
                                <Upload className="w-6 h-6 text-sky-400" />
                            </div>

                            <div>
                                <p className="text-text-primary font-medium mb-1">
                                    {selectedImage ? 'Image Selected' : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-text-primary/60 text-sm">
                                    PNG, JPG, JPEG up to 5MB
                                </p>
                            </div>

                            {selectedImage && (
                                <p className="text-sm text-sky-400 font-medium">
                                    {selectedImage.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Change Button */}
                    {!selectedImage && currentImage && (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-text-primary/5 hover:bg-text-primary/10 border border-text-primary/20 rounded-lg py-3 px-4 transition-colors"
                        >
                            <Camera className="w-4 h-4 text-text-primary" />
                            <span className="text-text-primary font-medium">Change Photo</span>
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-text-primary/10">
                    <button
                        onClick={handleClose}
                        className="flex-1 py-3 px-4 border border-text-primary/20 rounded-lg text-text-primary hover:bg-text-primary/5 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedImage}
                        className="flex-1 py-3 px-4 bg-sky-400 text-white rounded-lg hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        {isUploading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageUploadModal