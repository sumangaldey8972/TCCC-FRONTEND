// components/profile/KycSection.tsx
"use client"

import { CheckCircle, Clock, XCircle, AlertCircle, Upload } from "lucide-react"

interface User {
    kycStatus: string;
}

interface KycSectionProps {
    user: User;
}

const KycSection = ({ user }: KycSectionProps) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="w-6 h-6 text-emerald-400" />
            case "pending":
                return <Clock className="w-6 h-6 text-yellow-400" />
            case "reject":
                return <XCircle className="w-6 h-6 text-red-400" />
            default:
                return <AlertCircle className="w-6 h-6 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-emerald-400/20 text-emerald-400 border-emerald-400/30"
            case "pending":
                return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
            case "reject":
                return "bg-red-400/20 text-red-400 border-red-400/30"
            default:
                return "bg-gray-400/20 text-gray-400 border-gray-400/30"
        }
    }

    return (
        <div className="bg-background/50 backdrop-blur-sm border border-text-primary/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">KYC Verification</h2>

            {/* Status Card */}
            <div className={`border-2 rounded-2xl p-6 mb-8 ${getStatusColor(user.kycStatus)}`}>
                <div className="flex items-center gap-4">
                    {getStatusIcon(user.kycStatus)}
                    <div>
                        <h3 className="text-lg font-semibold">
                            KYC {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
                        </h3>
                        <p className="text-sm opacity-80">
                            {user.kycStatus === "approved" && "Your identity has been successfully verified."}
                            {user.kycStatus === "pending" && "Your documents are under review. This usually takes 1-2 business days."}
                            {user.kycStatus === "reject" && "Your verification was unsuccessful. Please upload new documents."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Upload Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-text-primary/20 rounded-2xl p-6 text-center hover:border-sky-400/50 transition-colors duration-300">
                    <Upload className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <h4 className="font-semibold text-text-primary mb-2">Government ID</h4>
                    <p className="text-text-primary/60 text-sm mb-4">Upload a clear photo of your government-issued ID</p>
                    <button className="px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition-colors">
                        Upload Document
                    </button>
                </div>

                <div className="border-2 border-dashed border-text-primary/20 rounded-2xl p-6 text-center hover:border-sky-400/50 transition-colors duration-300">
                    <Upload className="w-12 h-12 text-text-primary/40 mx-auto mb-4" />
                    <h4 className="font-semibold text-text-primary mb-2">Proof of Address</h4>
                    <p className="text-text-primary/60 text-sm mb-4">Recent utility bill or bank statement</p>
                    <button className="px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition-colors">
                        Upload Document
                    </button>
                </div>
            </div>
        </div>
    )
}

export default KycSection