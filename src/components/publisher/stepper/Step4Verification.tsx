"use client"

import { motion } from "framer-motion"
import { Globe, CheckCircle, AlertCircle, ExternalLink, SkipForward } from "lucide-react"
import { FormikProps } from "formik"
import { PublisherFormValues } from "@/type/publisher.type"

interface Step4VerificationProps {
    formik: FormikProps<PublisherFormValues>
    isSubmitting: boolean
    verificationStatus: 'pending' | 'verifying' | 'verified' | 'failed'
    verificationSkipped: boolean
    setVerificationStatus: (status: 'pending' | 'verifying' | 'verified' | 'failed') => void
    setVerificationSkipped: (skipped: boolean) => void
    onSubmit: () => void
}

const Step4Verification = ({
    formik,
    isSubmitting,
    verificationStatus,
    verificationSkipped,
    setVerificationStatus,
    setVerificationSkipped,
    onSubmit
}: Step4VerificationProps) => {

    // Handle website verification
    const verifyWebsite = async () => {
        setVerificationStatus('verifying')
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            // Simulate verification
            const randomSuccess = Math.random() > 0.3
            setVerificationStatus(randomSuccess ? 'verified' : 'failed')
        } catch (error) {
            setVerificationStatus('failed')
        }
    }

    // Skip verification
    const skipVerification = () => {
        setVerificationSkipped(true)
        setVerificationStatus('pending')
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
                    <Globe className="w-6 h-6 text-blue-500/80" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary/80 mb-2">
                    Website Verification
                </h3>
                <p className="text-sm text-text-primary/60">
                    Verify ownership of your website (optional but recommended)
                </p>
            </div>

            <div className="space-y-4">
                {/* Website Preview */}
                <div className="p-4 border border-text-primary/10 rounded-xl bg-background/50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-text-primary/60" />
                            <span className="text-sm font-medium text-text-primary/80">Your Website</span>
                        </div>
                        <a
                            href={formik.values.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        >
                            Visit <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                    <p className="text-sm text-text-primary/60 break-all">{formik.values.website}</p>
                </div>

                {/* Verification Status */}
                {!verificationSkipped && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 border rounded-xl bg-background/50"
                        style={{
                            borderColor:
                                verificationStatus === 'verified' ? '#10B981' :
                                    verificationStatus === 'failed' ? '#EF4444' :
                                        verificationStatus === 'verifying' ? '#3B82F6' :
                                            '#E5E7EB',
                            backgroundColor:
                                verificationStatus === 'verified' ? '#10B98110' :
                                    verificationStatus === 'failed' ? '#EF444410' :
                                        verificationStatus === 'verifying' ? '#3B82F610' :
                                            'transparent'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                {verificationStatus === 'verified' ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : verificationStatus === 'failed' ? (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                ) : verificationStatus === 'verifying' ? (
                                    <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                ) : (
                                    <Globe className="w-5 h-5 text-text-primary/40" />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-text-primary/80">
                                    {verificationStatus === 'verified' ? 'Website Verified' :
                                        verificationStatus === 'failed' ? 'Verification Failed' :
                                            verificationStatus === 'verifying' ? 'Verifying...' :
                                                'Verification Pending'}
                                </p>
                                <p className="text-sm text-text-primary/60 mt-1">
                                    {verificationStatus === 'verified' ? 'Your website has been successfully verified!' :
                                        verificationStatus === 'failed' ? 'Unable to verify website. You can skip and submit.' :
                                            verificationStatus === 'verifying' ? 'Please wait while we verify your website...' :
                                                'Click "Verify Now" to verify ownership of your website.'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {verificationSkipped && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            <div>
                                <p className="font-medium text-amber-600">Verification Skipped</p>
                                <p className="text-sm text-amber-600/70 mt-1">
                                    You can verify your website later from your publisher dashboard.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {!verificationSkipped && verificationStatus === 'pending' && (
                        <>
                            <button
                                type="button"
                                onClick={verifyWebsite}
                                disabled={isSubmitting}
                                className="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center justify-center gap-2"
                            >
                                <Globe className="w-4 h-4" />
                                Verify Now
                            </button>

                            <button
                                type="button"
                                onClick={skipVerification}
                                className="py-3 px-4 border border-text-primary/20 hover:border-text-primary/40 text-text-primary/70 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-primary/20 flex items-center justify-center gap-2"
                            >
                                <SkipForward className="w-4 h-4" />
                                Skip Verification
                            </button>
                        </>
                    )}

                    {verificationStatus === 'verifying' && (
                        <button
                            type="button"
                            disabled
                            className="col-span-2 py-3 px-4 bg-blue-500/50 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Verifying...
                        </button>
                    )}

                    {(verificationStatus === 'verified' || verificationStatus === 'failed' || verificationSkipped) && (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="col-span-2 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500/30 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Submit Application
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Step4Verification