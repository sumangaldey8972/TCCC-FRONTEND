"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, MessageSquare, Globe } from "lucide-react"
import { FormikProps } from "formik"
import { PublisherFormValues } from "@/type/publisher.type"

interface Step1BasicInfoProps {
    formik: FormikProps<PublisherFormValues>
}

const Step1BasicInfo = ({ formik }: Step1BasicInfoProps) => {
    return (
        <motion.div
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: "individual", label: "Individual", description: "Personal account" },
                        { id: "company", label: "Company", description: "Business account" }
                    ].map((type) => (
                        <motion.label
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-4 border rounded-xl cursor-pointer transition-all ${formik.values.accountType === type.id
                                ? 'border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20'
                                : 'border-text-primary/20 hover:border-text-primary/40'}`}
                        >
                            <input
                                type="radio"
                                name="accountType"
                                value={type.id}
                                onChange={formik.handleChange}
                                checked={formik.values.accountType === type.id}
                                className="sr-only"
                            />
                            <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center ${formik.values.accountType === type.id
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-text-primary/30'}`}
                                >
                                    {formik.values.accountType === type.id && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium text-text-primary/80">{type.label}</div>
                                    <div className="text-sm text-text-primary/50 mt-1">{type.description}</div>
                                </div>
                            </div>
                        </motion.label>
                    ))}
                </div>
                {formik.touched.accountType && formik.errors.accountType && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500/80"
                    >
                        {formik.errors.accountType}
                    </motion.p>
                )}
            </div>

            {/* Dynamic Name Field */}
            <AnimatePresence mode="wait">
                {formik.values.accountType === "individual" ? (
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
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.fullName && formik.errors.fullName
                                ? 'border-red-500/50 focus:ring-red-500/20'
                                : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                                } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                            placeholder="John Doe"
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="mt-2 text-sm text-red-500/80">{formik.errors.fullName}</p>
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
                            value={formik.values.organizationName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.organizationName && formik.errors.organizationName
                                ? 'border-red-500/50 focus:ring-red-500/20'
                                : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                                } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                            placeholder="Acme Inc."
                        />
                        {formik.touched.organizationName && formik.errors.organizationName && (
                            <p className="mt-2 text-sm text-red-500/80">{formik.errors.organizationName}</p>
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
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-11 pr-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? 'border-red-500/50 focus:ring-red-500/20'
                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                        placeholder="+1 234 567 8900"
                    />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-500/80">{formik.errors.phoneNumber}</p>
                )}

                {/* WhatsApp Option */}
                <div className="mt-3 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="hasWhatsApp"
                        name="hasWhatsApp"
                        checked={formik.values.hasWhatsApp}
                        onChange={formik.handleChange}
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
                        <MessageSquare className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="text"
                        name="telegramUsername"
                        value={formik.values.telegramUsername}
                        onChange={formik.handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-text-primary/5 border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500/50 focus:ring-blue-500/20 text-text-primary/80 placeholder-text-primary/30 text-sm"
                        placeholder="@username"
                    />
                </div>
            </div>

            {/* Website */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Website URL *
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Globe className="w-5 h-5 text-text-primary/40" />
                    </div>
                    <input
                        type="url"
                        name="website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-11 pr-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.website && formik.errors.website
                            ? 'border-red-500/50 focus:ring-red-500/20'
                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                        placeholder="https://example.com"
                    />
                </div>
                {formik.touched.website && formik.errors.website && (
                    <p className="mt-2 text-sm text-red-500/80">{formik.errors.website}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-text-primary/70 mb-2">
                    Description *
                    <span className="ml-2 text-xs text-text-primary/40">
                        {formik.values.description.length}/500
                    </span>
                </label>
                <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                    className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${formik.touched.description && formik.errors.description
                        ? 'border-red-500/50 focus:ring-red-500/20'
                        : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                        } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                    placeholder="Tell us about your brand, audience demographics, content themes, and why you'd be a great publisher partner..."
                />
                {formik.touched.description && formik.errors.description && (
                    <p className="mt-2 text-sm text-red-500/80">{formik.errors.description}</p>
                )}
                <p className="mt-2 text-xs text-text-primary/40">
                    Minimum 50 characters required
                </p>
            </div>
        </motion.div>
    )
}

export default Step1BasicInfo