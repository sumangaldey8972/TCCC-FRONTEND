"use client"

import { socialMediaOptions } from "@/type/publisher.type"
import { motion } from "framer-motion"
import { Users, AlertCircle, CheckCircle } from "lucide-react"

interface Step2TrafficSourcesProps {
    selectedSocialMedia: string[]
    toggleSocialMedia: (platformId: string) => void
}

const Step2TrafficSources = ({ selectedSocialMedia, toggleSocialMedia }: Step2TrafficSourcesProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
                    <Users className="w-6 h-6 text-blue-500/80" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary/80 mb-2">
                    Select Your Traffic Sources
                </h3>
                <p className="text-sm text-text-primary/60">
                    Choose all platforms where you have an active audience
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialMediaOptions.map((platform) => {
                    const Icon = platform.icon
                    const isSelected = selectedSocialMedia.includes(platform.id)
                    return (
                        <motion.button
                            key={platform.id}
                            type="button"
                            onClick={() => toggleSocialMedia(platform.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative p-4 rounded-xl border transition-all ${isSelected
                                ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20'
                                : 'border-text-primary/20 hover:border-text-primary/40'}`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: isSelected ? platform.color + '20' : 'transparent' }}
                                >
                                    <Icon
                                        className="w-5 h-5"
                                        style={{ color: isSelected ? platform.color : 'currentColor' }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-text-primary/70">
                                    {platform.name}
                                </span>
                            </div>
                            {isSelected && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </motion.button>
                    )
                })}
            </div>

            {/* {selectedSocialMedia.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-amber-600/90">
                                Please select at least one traffic source to continue.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )} */}
        </motion.div>
    )
}

export default Step2TrafficSources