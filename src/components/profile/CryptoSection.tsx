// components/profile/CryptoSection.tsx
"use client"

import { useState } from "react"
import { Bitcoin, Coins, MessageCircle, Edit2, Save, X, Copy, Check } from "lucide-react"
import { updateUser, User } from "@/store/slices/authSlice";
import { toastLoading, toastUpdate } from "@/app/utils/toast-message";
import appClient from "@/lib/appClient";
import { useAppDispatch } from "@/store/hooks/hooks";
import { uodateCryptoInformation } from "@/lib/firebase/firebaseUserCheck";


interface CryptoSectionProps {
    user: User;
}

const CryptoSection = ({ user }: CryptoSectionProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [copiedField, setCopiedField] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        bitcoinAddress: user.bitcoinAddress || "",
        usdtAddress: user.usdtAddress || "",
        telegramUsername: user.telegramUsername || "",
        userId: user._id || ""
    })


    const dispatch = useAppDispatch()

    const handleSave = async () => {
        setIsEditing(true)

        const toastId = toastLoading("Updating...", {
            description: "We are updating your details, please wait"
        })

        try {
            const response = await appClient.post("/api/auth/crypto-info", formData)

            if (response.data.status) {
                const user = response.data.updatedUser
                dispatch(updateUser({ user }))
                await uodateCryptoInformation(user)
                toastUpdate(toastId, "success", "Success", {
                    description: response.data.message || "Personal info updated successfully"
                })
                setIsEditing(false)
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occured";
            toastUpdate(toastId, "error", "Info update error", {
                description: errorMessage || "Info update failed"
            })
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            bitcoinAddress: user.bitcoinAddress || "",
            usdtAddress: user.usdtAddress || "",
            telegramUsername: user.telegramUsername || "",
            userId: user._id || ""
        })
        setIsEditing(false)
    }

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
    }

    return (
        <div className="bg-background/80 backdrop-blur-sm border border-text-primary/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Crypto & Social</h2>
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

            <div className="space-y-4">
                {/* Bitcoin Address */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Bitcoin className="w-4 h-4 text-orange-400" />
                        Bitcoin Address
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.bitcoinAddress}
                            onChange={(e) => setFormData({ ...formData, bitcoinAddress: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm font-mono"
                            placeholder="Enter Bitcoin address"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm font-mono break-all min-h-[40px] flex items-center">
                                {user.bitcoinAddress || "Not provided"}
                            </div>
                            {user.bitcoinAddress && (
                                <button
                                    onClick={() => handleCopy(user.bitcoinAddress!, "bitcoin")}
                                    className="p-2 text-text-primary/60 hover:text-text-primary transition-colors"
                                >
                                    {copiedField === "bitcoin" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* USDT Address */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Coins className="w-4 h-4 text-blue-400" />
                        USDT Address
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.usdtAddress}
                            onChange={(e) => setFormData({ ...formData, usdtAddress: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm font-mono"
                            placeholder="Enter USDT address"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm font-mono break-all min-h-[40px] flex items-center">
                                {user.usdtAddress || "Not provided"}
                            </div>
                            {user.usdtAddress && (
                                <button
                                    onClick={() => handleCopy(user.usdtAddress!, "usdt")}
                                    className="p-2 text-text-primary/60 hover:text-text-primary transition-colors"
                                >
                                    {copiedField === "usdt" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Telegram Username */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <MessageCircle className="w-4 h-4 text-sky-400" />
                        Telegram Username
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.telegramUsername}
                            onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                            className="w-full bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-sky-400 transition-colors text-sm"
                            placeholder="@username"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-background border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary text-sm min-h-[40px] flex items-center">
                                {user.telegramUsername ? `${user.telegramUsername}` : "Not provided"}
                            </div>
                            {user.telegramUsername && (
                                <button
                                    onClick={() => handleCopy(user.telegramUsername!, "telegram")}
                                    className="p-2 text-text-primary/60 hover:text-text-primary transition-colors"
                                >
                                    {copiedField === "telegram" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CryptoSection