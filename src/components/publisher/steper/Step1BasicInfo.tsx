"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, Globe, User, Building, Link as LinkIcon } from "lucide-react"
import { handleInputChange } from "./utils"
import { Step1BasicInfoProps } from "@/type/publisher.type"
import { FaTelegramPlane } from "react-icons/fa"

const Step1BasicInfo = ({ formData, errors, setFormData, setErrors }: Step1BasicInfoProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        handleInputChange(e, setFormData, setErrors)
    }

    const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        onChange(e)

        // Reset name fields when account type changes
        if (value === "individual") {
            setFormData(prev => ({ ...prev, organizationName: "" }))
            setErrors(prev => ({ ...prev, organizationName: "" }))
        } else {
            setFormData(prev => ({ ...prev, fullName: "" }))
            setErrors(prev => ({ ...prev, fullName: "" }))
        }
    }

    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Account Type */}
            <div>
                <label className="block text-sm font-semibold text-text-primary/80 mb-3">
                    Account Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    {[
                        { id: "individual", label: "Individual", icon: User, description: "Personal account" },
                        { id: "company", label: "Company", icon: Building, description: "Business account" }
                    ].map((type) => (
                        <motion.label
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-2 md:p-4 border rounded-xl cursor-pointer transition-all ${formData.accountType === type.id
                                ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20'
                                : 'border-text-primary/20 hover:border-text-primary/40'}`}
                        >
                            <input
                                type="radio"
                                name="accountType"
                                value={type.id}
                                onChange={handleAccountTypeChange}
                                checked={formData.accountType === type.id}
                                className="sr-only"
                            />
                            <div className="flex items-start gap-3">
                                <div className={`hidden md:flex w-10 h-10 rounded-lg flex items-center justify-center ${formData.accountType === type.id
                                    ? 'bg-blue-500/20 text-blue-500'
                                    : 'bg-text-primary/10 text-text-primary/40'}`}
                                >
                                    <type.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-base font-medium text-text-primary/80">{type.label}</div>
                                    <div className="hidden md:block text-sm text-text-primary/50 mt-1">{type.description}</div>
                                </div>
                                <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${formData.accountType === type.id
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-text-primary/30'}`}
                                >
                                    {formData.accountType === type.id && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                            </div>
                        </motion.label>
                    ))}
                </div>
            </div>

            {/* Dynamic Name Field */}
            <AnimatePresence mode="wait">
                {formData.accountType === "individual" ? (
                    <motion.div
                        key="individual"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <label className="block text-sm font-medium text-text-primary/70 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={onChange}
                            className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.fullName
                                ? 'border-red-500/50 focus:ring-red-500/20'
                                : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                                } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                            placeholder="John Doe"
                        />
                        {errors.fullName && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-500/80"
                            >
                                {errors.fullName}
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="company"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <label className="block text-sm font-medium text-text-primary/70 mb-2">
                            Organization Name *
                        </label>
                        <input
                            type="text"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={onChange}
                            className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.organizationName
                                ? 'border-red-500/50 focus:ring-red-500/20'
                                : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                                } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                            placeholder="Acme Inc."
                        />
                        {errors.organizationName && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-500/80"
                            >
                                {errors.organizationName}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phone Number */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Phone Number *
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Smartphone className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={onChange}
                        className={`w-full pl-11 pr-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.phoneNumber
                            ? 'border-red-500/50 focus:ring-red-500/20'
                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                        placeholder="+1 234 567 8900"
                    />
                </div>
                {errors.phoneNumber && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500/80"
                    >
                        {errors.phoneNumber}
                    </motion.p>
                )}

                {/* WhatsApp Option */}
                <div className="mt-3 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="hasWhatsApp"
                        name="hasWhatsApp"
                        checked={formData.hasWhatsApp}
                        onChange={onChange}
                        className="w-4 h-4 rounded border-text-primary/30 text-blue-500 focus:ring-blue-500/30"
                    />
                    <label htmlFor="hasWhatsApp" className="text-sm text-text-primary/60">
                        This is also my WhatsApp number
                    </label>
                </div>
            </div>

            {/* Telegram Username */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Telegram Username <span className="text-text-primary/40">(Optional)</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <FaTelegramPlane className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="text"
                        name="telegramUsername"
                        value={formData.telegramUsername}
                        onChange={onChange}
                        className="w-full pl-11 pr-4 py-3 bg-text-primary/5 border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500/50 focus:ring-blue-500/20 text-text-primary/80 placeholder-text-primary/30 text-sm"
                        placeholder="@username"
                    />
                </div>
            </div>

            {/* Profile Link */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Profile Link <span className="text-text-primary/40">(Optional)</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <LinkIcon className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="url"
                        name="profileLink"
                        value={formData.profileLink}
                        onChange={onChange}
                        className={`w-full pl-11 pr-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.profileLink
                            ? 'border-red-500/50 focus:ring-red-500/20'
                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                        placeholder="https://youtube.com/yourchannel or https://t.me/username"
                    />
                </div>
                {errors.profileLink && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500/80"
                    >
                        {errors.profileLink}
                    </motion.p>
                )}
                <p className="mt-1 text-xs text-text-primary/40">
                    YouTube, Telegram, Twitter/X, or any social media profile
                </p>
            </div>

            {/* Website */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Website URL <span className="text-text-primary/40">(Optional)</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Globe className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={onChange}
                        className={`w-full pl-11 pr-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.website
                            ? 'border-red-500/50 focus:ring-red-500/20'
                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                        placeholder="https://example.com"
                    />
                </div>
                {errors.website && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500/80"
                    >
                        {errors.website}
                    </motion.p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Description <span className="text-text-primary/40">(Optional)</span>
                    <span className="ml-2 text-xs text-text-primary/40">
                        {formData.description.length}/500
                    </span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500/50 focus:ring-blue-500/20 text-text-primary/80 placeholder-text-primary/30 text-sm resize-none"
                    placeholder="Tell us about your brand, audience demographics, content themes, and why you'd be a great publisher partner..."
                />
            </div>
        </motion.div>
    )
}

export default Step1BasicInfo