import { Shield, CheckCircle, AlertCircle } from "lucide-react"

interface StatusBadgesProps {
    isVerified: boolean;
    kycStatus: string;
    onKycClick: () => void;
    size?: "sm" | "md" | "lg";
}

const StatusBadges = ({ isVerified, kycStatus, onKycClick, size = "lg" }: StatusBadgesProps) => {
    const sizeClasses = {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-sm px-4 py-1.5"
    }

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-4 h-4"
    }

    return (
        <div className="flex items-center gap-2">
            {isVerified && (
                <div className={`flex items-center gap-1 bg-emerald-400/20 text-emerald-400 rounded-full font-medium ${sizeClasses[size]}`}>
                    <CheckCircle className={iconSizes[size]} />
                    Verified
                </div>
            )}
            <button
                onClick={onKycClick}
                className={`flex items-center gap-1 rounded-full font-medium transition-all duration-200 ${kycStatus === "approved"
                    ? "bg-emerald-400/20 text-emerald-400 cursor-default"
                    : kycStatus === "pending"
                        ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 cursor-pointer"
                        : "bg-red-400/20 text-red-400 hover:bg-red-400/30 cursor-pointer"
                    } ${sizeClasses[size]}`}
            >
                <Shield className={iconSizes[size]} />
                KYC {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
                {kycStatus !== "approved" && (
                    <AlertCircle className={`${iconSizes[size]} ml-1`} />
                )}
            </button>
        </div>
    )
}

export default StatusBadges