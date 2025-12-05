"use client"

import { motion } from "framer-motion"
import { TrendingUp, AlertCircle } from "lucide-react"
import { FormikProps } from "formik"
import { PublisherFormValues, socialMediaOptions } from "@/type/publisher.type"
import { IconBase } from "react-icons/lib"

interface Step3AudienceDetailsProps {
    formik: FormikProps<PublisherFormValues>
    selectedSocialMedia: string[]
}

const Step3AudienceDetails = ({ formik, selectedSocialMedia }: Step3AudienceDetailsProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-500/80" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary/80 mb-2">
                    Audience Details
                </h3>
                <p className="text-sm text-text-primary/60">
                    Provide follower counts for your selected platforms
                </p>
            </div>

            <div className="space-y-4">
                {selectedSocialMedia.map((platformId) => {
                    const platform = socialMediaOptions.find(p => p.id === platformId)
                    const Icon = platform?.icon

                    return (
                        <motion.div
                            key={platformId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border border-text-primary/10 rounded-xl bg-background/50"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: platform?.color + '20' }}
                                >
                                    <IconBase className="w-5 h-5" style={{ color: platform?.color }} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-text-primary/80">{platform?.name}</h4>
                                    <p className="text-xs text-text-primary/50">Follower statistics</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary/70 mb-2">
                                        Followers *
                                    </label>
                                    <input
                                        type="number"
                                        value={formik.values.socialMediaStats[platformId]?.followers || ''}
                                        onChange={(e) => formik.setFieldValue(`socialMediaStats.${platformId}.followers`, e.target.value)}
                                        onBlur={formik.handleBlur}
                                        className={`w-full px-4 py-3 bg-text-primary/5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.socialMediaStats?.[platformId]?.followers &&
                                            (formik.errors.socialMediaStats as any)?.[platformId]?.followers
                                            ? 'border-red-500/50 focus:ring-red-500/20'
                                            : 'border-text-primary/20 focus:border-blue-500/50 focus:ring-blue-500/20'
                                            } text-text-primary/80 placeholder-text-primary/30 text-sm`}
                                        placeholder="e.g., 10000"
                                        min="0"
                                    />
                                    {(formik.touched.socialMediaStats?.[platformId]?.followers &&
                                        (formik.errors.socialMediaStats as any)?.[platformId]?.followers) && (
                                            <p className="mt-2 text-sm text-red-500/80">
                                                {(formik.errors.socialMediaStats as any)[platformId].followers}
                                            </p>
                                        )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-primary/70 mb-2">
                                        Average Likes/Views
                                    </label>
                                    <input
                                        type="number"
                                        value={formik.values.socialMediaStats[platformId]?.likes || ''}
                                        onChange={(e) => formik.setFieldValue(`socialMediaStats.${platformId}.likes`, e.target.value)}
                                        className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500/50 focus:ring-blue-500/20 text-text-primary/80 placeholder-text-primary/30 text-sm"
                                        placeholder="Optional"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {formik.touched.socialMediaStats && formik.errors.socialMediaStats &&
                typeof formik.errors.socialMediaStats === 'string' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-sm text-red-500/90">{formik.errors.socialMediaStats}</p>
                        </div>
                    </motion.div>
                )}
        </motion.div>
    )
}

export default Step3AudienceDetails